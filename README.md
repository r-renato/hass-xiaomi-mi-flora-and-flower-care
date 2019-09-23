# Xiaomi mi flora and Flower care integration

The component uses Flower Care&trade; Smart Monitor to retrieve flower information (http://www.huahuacaocao.com/product).
HuaHuaCaoCao  means flowers & Plants in Chinese.

Need to register to Flower Care&trade; Smart Monitor App 
<a href="https://play.google.com/store/apps/details?id=com.huahuacaocao.flowercare&hl=it" target="_blank">on Google Android devices</a> or 
<a href="https://apps.apple.com/it/app/flower-care/id1095274672" target="_blank">on Apple iOS devices</a> to use the component.


[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=for-the-badge)](https://github.com/custom-components/hacs)
[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE)

![Project Maintenance][maintenance-shield]
[![BuyMeCoffee][buymecoffeebadge]][buymecoffee]

_Home Assistant Plant monitor extended component, integrated with Flora care application plant informations._


## Manual installation

1. Using the tool of choice, open the directory (folder) of your HA configuration (there you can find `configuration.yaml`).
2. If you do not have a `custom_components` directory (folder) there, you need to create it.
3. In the `custom_components` directory (folder) create a new folder called `huahuacaocao`.
4. Download _all_ the files from the `custom_components/huahuacaocao/` directory (folder) in this repository.
5. Place the files you downloaded in the new directory (folder) you created.

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
>(list)(Required)<br>List of sensor measure entities.

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

<img src="/.md.images/ha-plant-panel.png"  width="40%" height="40%" alt="Home Assistant plant panel">


[buymecoffee]: https://www.buymeacoffee.com/0D3WbkKrn
[buymecoffeebadge]: https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg?style=for-the-badge
[license-shield]: https://img.shields.io/github/license/custom-components/sensor.avanza_stock.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Claes%20Hallström%20%40claha-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/custom-components/sensor.avanza_stock.svg?style=for-the-badge
[releases]: https://github.com/custom-components/sensor.avanza_stock/releases