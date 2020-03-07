import { ActionConfig } from "custom-card-helpers";

// TODO Add your configuration elements here for type-checking
export interface CardConfig {
    type: string;
    name?: string;
    zone_name?: string;
    entity: string;
}
export interface FloraCarePlantRanges {
    "max_light_mmol": number,
    "min_light_mmol": number,
    "max_light_lux": number,
    "min_light_lux": number,
    "max_temp": number,
    "min_temp": number,
    "max_env_humid": number,
    "min_env_humid": number,
    "max_soil_moist": number,
    "min_soil_moist": number,
    "max_soil_ec": number,
    "min_soil_ec": number
}

export interface FloraCarePlant {
    attributes : {
        problem: string,
        sensors: [{ key: string }],
        ranges: FloraCarePlantRanges,
        maintenance: Object,
        info: Object,
        image: string
    } ;
}

export interface Sensor {
    state: string ;
    attributes : {
        friendly_name?: string ;
        icon?: string ;
        unit_of_measurement?: string ;
    }
}