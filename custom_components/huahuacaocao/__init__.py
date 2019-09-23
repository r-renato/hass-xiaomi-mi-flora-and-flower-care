"""Support for Xiaomi Flora devices using huahuacaocao.com"""
from datetime import timedelta
import logging

import voluptuous as vol

import homeassistant.core as ha
from homeassistant.const import (
    CONF_USERNAME,
    CONF_PASSWORD)
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers import discovery

import requests

_LOGGER = logging.getLogger(__name__)

COMPONENTS_WITH_CC_PLATFORM = [
    'sensor',
]

CONF_REGION = "region"
DEFAULT_REGION = "CN"

DOMAIN = "huahuacaocao"

CONFIG_SCHEMA = vol.Schema(
    {
        DOMAIN: vol.Schema(
            {
                vol.Required(CONF_USERNAME): cv.string,
                vol.Required(CONF_PASSWORD): cv.string,
                vol.Optional(CONF_REGION, default=DEFAULT_REGION): cv.string,
            }
        )
    },
    extra=vol.ALLOW_EXTRA,
)

_ENDPOINT = 'https://eu-api.huahuacaocao.net/api/v2'

DEFAULT_TIMEOUT = 10

SCAN_INTERVAL = timedelta(seconds=60)

SERVICE_API = 'flower_service'


async def async_setup(hass, config):
    _LOGGER.info("__init__ async_setup start for domain %s.", DOMAIN)

    """Set up the environment."""
    if DOMAIN not in config:
        return True

    _LOGGER.debug(config[DOMAIN])
    config.setdefault(ha.DOMAIN, {})
    config.setdefault(DOMAIN, {})

    hass.data[DOMAIN][SERVICE_API] = ServiceAPI(config[DOMAIN][CONF_USERNAME], config[DOMAIN][CONF_PASSWORD], config[DOMAIN][CONF_REGION])

    # Set up demo platforms
    for component in COMPONENTS_WITH_CC_PLATFORM:
        _LOGGER.info("__init__ async_setup load_platform for component: '%s' in domain '%s'.", DOMAIN, component)
        hass.async_create_task(discovery.async_load_platform(hass, component, DOMAIN, {}, config))

    _LOGGER.info("__init__ async_setup done for domain %s.", DOMAIN)

    return True


async def async_setup_entry(hass, entry):
    """Set up a config entry.

    Parameters:
    argument1 (hass): Description of arg1
    argument2 (entry): Description of arg1

    Returns:
    int:Returning value

    """
    return await hass.data[DOMAIN].async_setup_entry(entry)


async def async_unload_entry(hass, entry):
    """Unload a config entry."""
    return await hass.data[DOMAIN].async_unload_entry(entry)


class ServiceAPI(object):

    def __init__(self, username, password, region):
        """Initialize the Service API"""

        self._headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Hhcc-Region': region,
            'Token': '',
            'X-Real-Ip': '192.168.1.1'
        }

        self._authorization_payload = {
            'data': {
                'email': username,
                'password': password
            },
            'extra': {
                'app_channel': 'google',
                'country': 'IT',
                'lang': 'it',
                'model': '',
                'phone': 'samsung_SM-G955F_26',
                'position': [],
                'version': 'AS_3044_5.4.6',
                'zone': 1
            },
            'method': 'GET',
            'path': '/token/email',
            'service': 'auth'
        }

        self._retryLogin = True
        self._token = None
        self.retrieve_authorization_token()

    def get_authorization_token(self):
        if not (self._token is None):
            self.retrieve_authorization_token()

        return self._token

    def retrieve_authorization_token(self):
        """Retrieve authorizzation token for use huahuacaocao.com rest api
    
        Parameters:
        argument1 (hass): Description of arg1
        argument2 (entry): Description of arg1
    
        Returns:
        int:Returning value
    
        """
        import socket
        import json

        if self._retryLogin:
            try:
                response = requests.request("POST", _ENDPOINT, json=self._authorization_payload, headers=self._headers)
                _LOGGER.debug(response.text)

                if response.status_code == 200:
                    rdata = json.loads(response.text)
                    _LOGGER.debug(rdata)
                    if rdata['status'] == 100:
                        self._token = rdata['data']['token']

            except socket.error as err:
                self._retryLogin = False
                _LOGGER.debug("Caught exception socket.error: %s", err)

    def retrieve_flower_details(self, pid):
        import copy
        import socket
        import json

        details_payload = {
            "data": {
                "lang": "en",
                "pid": pid
            },
            "extra": {
                "app_channel": "google",
                "country": "IT",
                "lang": "it",
                "model": "",
                "phone": "samsung_SM-G955F_26",
                "position": [],
                "version": "AS_3044_5.4.6",
                "zone": 1
            },
            "method": "GET",
            "path": "/plant/detail",
            "service": "pkb"
        }

        if not (self.get_authorization_token() is None):
            try:
                headers = copy.copy(self._headers)
                headers['Token'] = self._token

                response = requests.request("POST", _ENDPOINT, json=details_payload, headers=headers)
                _LOGGER.debug(response.text)

                result = None

                if response.status_code == 200:
                    rdata = json.loads(response.text)

                    if rdata['status'] == 100:
                        result = rdata['data']

                return result

            except socket.error as err:
                self._retryLogin = False
                _LOGGER.debug("Caught exception socket.error: %s", err)
