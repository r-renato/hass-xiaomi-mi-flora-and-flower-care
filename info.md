The Home Assistant custom component use Flower Care&trade; Smart Monitor to retrieve flower information (http://www.huahuacaocao.com/product).
HuaHuaCaoCao, in Chinese which means flowers & Plants.

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/custom-components/hacs)

[![License][license-shield]](LICENSE.md)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/r-renato/ha-card-waze-travel-time.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/hass-xiaomi-mi-flora-and-flower-care/alerts/)
[![Language grade: Python](https://img.shields.io/lgtm/grade/python/g/r-renato/hass-xiaomi-mi-flora-and-flower-care.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/r-renato/hass-xiaomi-mi-flora-and-flower-care/context:python)

[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

Need to register to Flower Care&trade; Smart Monitor App 
<a href="https://play.google.com/store/apps/details?id=com.huahuacaocao.flowercare&hl=it" target="_blank">on Google Android devices</a> or 
<a href="https://apps.apple.com/it/app/flower-care/id1095274672" target="_blank">on Apple iOS devices</a> to use the component.

## Features

* Xiaomi mi flora sensor and Flower Care&trade; Smart Monitor integration
* Sensor optimal range applied using plant ID
* Retrieve general plant information
* Retrieve information to plant maintenance
* Retrieve plant image

## Configuration

1. Install your preferred Flower Care&trade; Smart Monitor App
2. Register your credentials in App, the same credentials will be used to configure the `huahuacaocao` integration component

### Component variables

**username**
>(string)(Required)<br>The username to use with your Flower Care&trade; Smart Monitor App.

**password**
>(string)(Required)<br>The corresponding password in yourFlower Care&trade; Smart Monitor App.

**region**
>(string)(Optional)<br>Your country code (two-letter)

#### Examples

```yaml
huahuacaocao:
  username: !secret huahuacaocao_user
  password: !secret huahuacaocao_password
  region: EU
```

### Sensor variables

**plant_id**
>(string)(Required)<br>Plant alias. You can find it in the Plant Archive panel of the Flower Care&trade; Smart Monitor App

**Name**
>(string)(Required)<br>Name to use in the frontend.

**sensors**
>(list)(Optional)<br>List of sensor measure entities.

>**moisture**
>>(string)(Optional)<br>Moisture of the plant. Measured in %. Can have a min and max value set optionally.

>**battery**
>>(string)(Optional)<br>Battery level of the plant sensor. Measured in %. Can only have a min level set optionally.

>**temperature**
>>(string)(Optional)<br>Temperature of the plant. Measured in degrees Celsius. Can have a min and max value set optionally.

>**conductivity**
>>(string)(Optional)<br>Conductivity of the plant. Measured in µS/cm. Can have a min and max value set optionally.

>**brightness**
>>(string)(Optional)<br>Light exposure of the plant. Measured in Lux. Can have a min and max value set optionally.


#### Examples

```yaml
  - platform: huahuacaocao
    plant_id: "zamioculcas zamiifolia"
    name: "Plant Zamioculcas Zamiifolia"
    sensors:
      moisture: sensor.zamioculcas_zamiifolia_moisture
      battery: sensor.zamioculcas_zamiifolia_battery
      temperature: sensor.zamioculcas_zamiifolia_temperature
      conductivity: sensor.zamioculcas_zamiifolia_conductivity
      brightness: sensor.zamioculcas_zamiifolia_light_intensity
```

## Integration Examples

```yaml
huahuacaocao:
  username: !secret huahuacaocao_user
  password: !secret huahuacaocao_password
  region: EU
  
sensor:
  - platform: miflora
    mac: 'XX:XX:XX:XX:XX:XX'
    name: Zamioculcas Zamiifolia
    force_update: true
    median: 3
    monitored_conditions:
      - moisture
      - light
      - temperature
      - conductivity
      - battery

  - platform: huahuacaocao
    plant_id: "zamioculcas zamiifolia"
    name: "Plant Zamioculcas Zamiifolia"
    sensors:
      moisture: sensor.zamioculcas_zamiifolia_moisture
      battery: sensor.zamioculcas_zamiifolia_battery
      temperature: sensor.zamioculcas_zamiifolia_temperature
      conductivity: sensor.zamioculcas_zamiifolia_conductivity
      brightness: sensor.zamioculcas_zamiifolia_light_intensity
```

Home Assistant Flora Panel 

<img src="https://gitlab.com/rrenato/hass-xiaomi-mi-flora-and-flower-care/raw/master/.md.images/ha-plant-panel.png"  width="40%" height="40%" alt="Home Assistant plant panel">

## Lovelace Configuration

Import the card using:

```yaml
resources:
  - url: /local/hass-xiaomi-mi-flora-and-flower-care/hass-xiaomi-mi-flora-and-flower-care.js
    type: js
```
### Card variables

**Name**
>(string)(Required)<br>Name to use in the header.

**entity**
>(list)(Required)<br>huahuacaocao sensor (The huahuacaocao sensor are defined as 'plant')

#### Examples

```yaml
type: custom:xiaomi-mi-flora-and-flower-care-card
name: "Zamioculcas Zamiifolia"
entity: plant.plant_zamioculcas_zamiifolia
```

or

```yaml
type: custom:card-modder
card:
  type: custom:xiaomi-mi-flora-and-flower-care-card
  name: "Zamioculcas Zamiifolia"
  entity: plant.plant_zamioculcas_zamiifolia
style:
  background-repeat: no-repeat
  background-color: rgba(50,50,50,0.3)
  background-size: 100% 300px
  border-radius: 20px
  border: solid 1px rgba(100,100,100,0.3)
  box-shadow: 3px 3px rgba(0,0,0,0.4)
```

<img src="https://gitlab.com/rrenato/hass-xiaomi-mi-flora-and-flower-care/raw/master/.md.images/ha-lovelace-plant-card.png"  width="40%" height="40%" alt="Home Assistant lovelace card">

[license-shield]:https://img.shields.io/github/license/r-renato/hass-xiaomi-mi-flora-and-flower-care
[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow?style=for-the-badge
