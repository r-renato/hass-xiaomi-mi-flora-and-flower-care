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

import json
import requests

import random
import socket
import struct

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

_HOSTNAME = 'eu-api.huahuacaocao.net'
_ENDPOINT = 'https://' + _HOSTNAME + '/api/v2'

DEFAULT_TIMEOUT = 10

SCAN_INTERVAL = timedelta(seconds=60)

SERVICE_API = 'flower_service'


async def async_setup(hass, config):
    _LOGGER.info("__init__ async_setup start for domain %s.", DOMAIN)

    """Set up the environment."""
    if DOMAIN not in config:
        return True

    if DOMAIN not in hass.data:
        hass.data[DOMAIN] = {}

    config.setdefault(ha.DOMAIN, {})
    config.setdefault(DOMAIN, {})

    hass.data[DOMAIN][SERVICE_API] = ServiceAPI(config[DOMAIN][CONF_USERNAME], config[DOMAIN][CONF_PASSWORD], config[DOMAIN][CONF_REGION])

    # Set up platforms
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

        ip = socket.inet_ntoa(struct.pack('>I', random.randint(1, 0xffffffff)))

        self._headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Hhcc-Region': region,
            'X-Hhcc-Token': '',
            'X-Real-Ip': ip
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
        # self.retrieve_authorization_token()

    @staticmethod
    def resolves_hostname(hostname):
        try:
            socket.gethostbyname(hostname)
            return True
        except socket.error:
            return False

    def get_authorization_token(self):
        if self._token is None:
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

        if self._retryLogin:
            try:
                _LOGGER.debug("ServiceAPI retrieve_authorization_token headers: %s", self._headers)
                _LOGGER.debug("ServiceAPI retrieve_authorization_token payload: %s", self._authorization_payload)

                if not ServiceAPI.resolves_hostname( _HOSTNAME ):
                    _LOGGER.error("Hostname (%s) could not be resolved.", _HOSTNAME )

                response = requests.request("POST", _ENDPOINT,
                                            json=self._authorization_payload, headers=self._headers,
                                            timeout=(10.05, 27), verify=False
                                            )
                _LOGGER.debug("ServiceAPI retrieve_authorization_token response data: %s", response.text)

                if response.status_code == 200:
                    rdata = json.loads(response.text)

                    if rdata['status'] == 100:
                        self._token = rdata['data']['token']
                        _LOGGER.debug("Token retrieved: %s", self._token)

            except socket.error as err:
                self._retryLogin = False
                _LOGGER.debug("Caught exception socket.error '%s' trying to retrieve access token.", err)

    def retrieve_flower_details(self, pid):
        import copy

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
                headers['X-Hhcc-Token'] = self.get_authorization_token()

                _LOGGER.debug("ServiceAPI retrieve_flower_details headers: %s", headers)
                _LOGGER.debug("ServiceAPI retrieve_flower_details payload: %s", details_payload)

                response = requests.request("POST", _ENDPOINT,
                                            json=details_payload, headers=headers,
                                            timeout=(10.05, 27), verify=False
                                            )
                _LOGGER.debug("ServiceAPI retrieve_flower_details response data: %s", response.text)

                result = None

                if response.status_code == 200:
                    rdata = json.loads(response.text)

                    if rdata['status'] == 100:
                        result = rdata['data']

                return result

            except socket.error as err:
                self._retryLogin = False
                _LOGGER.debug("Caught exception socket.error '%s' trying to retrieve flower details.", err)
