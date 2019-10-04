import {
    LitElement,
    html,
    customElement,
    property,
    CSSResult,
    TemplateResult,
    css,
    PropertyValues
} from "lit-element";

import {
    HomeAssistant,
    handleClick,
    longPress,
    hasConfigOrEntityChanged
} from "custom-card-helpers";

import {CardConfig, FloraCarePlant, FloraCarePlantRanges, Sensor} from "./types";

import style from './style';


// TODO Name your custom element
@customElement("xiaomi-mi-flora-and-flower-care-card")
class FlowerCareCard extends LitElement {
    readonly MOINSTURE = 'moisture' ;
    readonly CONDUCTIVITY = 'conductivity' ;
    readonly BRIGHTNESS = 'brightness' ;
    readonly TEMPERATURE = 'temperature' ;
    readonly BATTERY = 'battery' ;

    // TODO Add any properities that should cause your element to re-render here
    @property() public hass?: HomeAssistant ;

    @property() private _config?: CardConfig ;

    @property() private _floraCare?: FloraCarePlant ;
    @property() private _floraRanges?: FloraCarePlantRanges ;

    /**
     * get the current size of the card
     * @return {Number}
     */
    getCardSize() {
        return 1;
    }

    /**
     *
     * @returns {CSSResult}
     */
    static get styles(): CSSResult {
        return style;
    }

    /**
     *
     * @param {CardConfig} config
     */
    public setConfig(config: CardConfig): void {
        console.log({ flora_care_card_config: config });

        // TODO Check for required fields and that they are of the proper format
        if (!config) throw new Error("Invalid configuration");

        if (!config.entity) throw new Error('entity is required');

        this._config = config;
    }


    /**
     * generates the card HTML
     * @return {TemplateResult}
     */
    render() {
        if ( undefined == this.hass.states[ this._config!.entity ]) return html`
            <ha-card>
                <div class='banner'>
                    <div class="header">xiaomi-mi-flora-and-flower-care-card</div>
                </div>
                <div class='content'>
                    Entity '${this._config!.entity}' not found.
                </div>
            </ha-card>
        `;
        else return this._render() ;
    }

    /**
     *
     * @returns {TemplateResult}
     * @private
     */
    _render() {
        if ( undefined == this.hass.states[ this._config!.entity ]) throw new Error('entity is required');

        this._floraCare = <undefined> this.hass.states[ this._config!.entity ] ;
        this._floraRanges = this._floraCare.attributes.ranges ;

        return html`
      <ha-card style="background-image:url(${this._floraCare.attributes.image})">
        <div class='banner'>
            <table is="s-table-lite">
                <thead>
                    <tr>
                        <td valign="top" class="header">
                            ${this.computeTitle()}
                        </td>
                        <td>
                            <div class="attributes">
                                <div class="fcasttooltip">
                                    <ha-icon icon="mdi:information-variant"></ha-icon>
                                    <div class="fcasttooltiptext">${this.computeInfoToolTips(this._floraCare.attributes.info)}</div>
                                </div>
                                <div class=""></div>
                                <div class="uom">&nbsp;</div>            
                            </div>                            
                        </td>  
                        <td>
                            <div class="attributes">
                                <div class="fcasttooltip">
                                    <ha-icon icon="mdi:lifebuoy"></ha-icon>
                                    <div class="fcasttooltiptext">${this.computeMaintenanceToolTips(this._floraCare.attributes.maintenance)}</div>
                                </div>
                                <div class=""></div>
                                <div class="uom">&nbsp;</div>            
                            </div>                            
                        </td>                        
                        <td>
                        ${this.computeContentItem(
                            this.getSensor( this._floraCare.attributes.sensors[ this.BATTERY ]),
                            null, null,
                            this.computeAttributeClass( this._floraCare.attributes.problem, this.BATTERY )
                        )}  
                        </td>
                    </tr>
                </thead>
           
            </table>           
        </div>
        <div class='content'></div>
        <div class='content'>
            ${this.computeContent()}
        </div>
      </ha-card>
        `;
    }

    /**
     *
     * @returns {TemplateResult}
     */
    computeContent() {
        //console.log({ configconfig: this.hass.states[ this._config!.entity ]});
        //console.log({ config2: this.hass.states[ 'sensor.zamioculcas_zamiifolia_battery' ]});




        //console.log({ floracaresensor: floraCare.attributes.sensors });

        return html`
            ${this.computeContentItem( 
                this.getSensor( this._floraCare.attributes.sensors[ this.MOINSTURE ]),
                this._floraRanges.min_soil_moist, this._floraRanges.max_soil_moist, 
                this.computeAttributeClass( this._floraCare.attributes.problem, this.MOINSTURE )
            )}
            ${this.computeContentItem( 
                this.getSensor( this._floraCare.attributes.sensors[ this.CONDUCTIVITY ]),
                this._floraRanges.min_soil_ec, this._floraRanges.max_soil_ec,
                this.computeAttributeClass( this._floraCare.attributes.problem, this.CONDUCTIVITY )
            )}
            ${this.computeContentItem( 
                this.getSensor( this._floraCare.attributes.sensors[ this.BRIGHTNESS ]),
                this._floraRanges.min_light_lux, this._floraRanges.max_light_lux,
                this.computeAttributeClass( this._floraCare.attributes.problem, this.BRIGHTNESS )
            )}
            ${this.computeContentItem( 
                this.getSensor( this._floraCare.attributes.sensors[ this.TEMPERATURE ]),
                this._floraRanges.min_temp, this._floraRanges.max_temp,
                this.computeAttributeClass( this._floraCare.attributes.problem, this.TEMPERATURE )
            )}
        `;
    }

    /**
     *
     * @param model
     * @returns {TemplateResult}
     */
    computeBanner( model ) {
        if( 'full' === model.toLowerCase ) return this.computeFullBanner() ;
        else return this.computeFullBanner() ;
    }

    /**
     *
     * @returns {TemplateResult}
     */
    computeFullBanner() {
        return html`
            <div class="header">${this.computeTitle()}</div>
        `;
    }

    computeTitle() {
        return (this._config && this._config.name) ;
    }

    /**
     *
     * @param {Sensor} sensor
     * @param {number} min
     * @param {number} max
     * @param {string} problemClass
     * @returns {TemplateResult}
     */
    computeContentItem( sensor : Sensor, min : number, max : number, problemClass : string ) {
        return html`
             <div class="attributes" on-click="attributeClicked">
                <div>
                    <ha-icon icon="${sensor.attributes.icon}"></ha-icon>
                </div>
                <div class="${problemClass}">
                    ${sensor.state} ${sensor.attributes.unit_of_measurement}
                </div>
                <div class="uom">
                ${null !== min && null !== max ? html`${min}-${max}` : html``}
                </div>            
            </div>           
        `;
    }

    computeMaintenanceToolTips( maintenance ) {
        return html`
            <table is="s-table-lite">
                <tbody> 
                    ${Object.keys(maintenance).map( key => html`
                        <tr>
                            <td valign="top" style="width:1%;text-align: left;">${this.capitalize(key)}</td>
                            <td valign="top" style="text-align: left;">${maintenance[key]}</td>
                        </tr>    
                    `)}  
                </tbody>
            </table>      
        `;
    }

    computeInfoToolTips( info ) {
        return html`
            <table is="s-table-lite">
                <tbody>
                    ${Object.keys(info).filter( key => {
                        if( 'floral_language' == key ) {
                            return false; // skip
                        }
                        return true;    
                    }).map( key => html`
                        
                        <tr>
                            <td valign="top" style="width:1%;text-align: left;">${this.capitalize(key)}</td>
                            <td valign="top" style="text-align: left;">${info[key]}</td>
                        </tr>    
                    `)}                    
                </tbody>
            </table>      
        `;
    }
    /**
     *
     * @param problem
     * @param attr
     * @returns {string}
     */
    computeAttributeClass(problem, attr) {
        return problem.indexOf(attr) === -1 ? "" : "problem";
    }

/*    private _handleTap(): void {
        handleClick(this, this.hass!, this._config!, false);
    }

    private _handleHold(): void {
        handleClick(this, this.hass!, this._config!, true);
    }*/

    /**
     *
     * @param {string} name
     */
    getSensor( name : string ) : Sensor {
        let sensor:Sensor = <undefined> this.hass.states[ name ] ;

        return( sensor ) ;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}


