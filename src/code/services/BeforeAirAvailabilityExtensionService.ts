import { IAreaService } from 'sabre-ngv-app/app/services/impl/IAreaService';
import { BeforeAirAvailabilityExtension } from 'sabre-ngv-extensionPoints/extensions/BeforeAirAvailabilityExtension';
import { CommandMessageAirAvailabilityInputRq, ExtPointAirAvailabilityRqDataResult } from 'sabre-ngv-pos-cdm/airavailability';
import { getService } from '../Context';


// The name of the class we created does not matter
// This class needs to extend the appropriate extension point base class
export class BeforeAirAvailabilityExtensionService extends BeforeAirAvailabilityExtension {
    // SERVICE_NAME should consist of web module name followed by dash and class name
    static SERVICE_NAME = 'com-example-redapp-assessment-web-module-BeforeAirAvailabilityExtensionService';

    async onBeforeAirAvailability(rq: CommandMessageAirAvailabilityInputRq):
        Promise<ExtPointAirAvailabilityRqDataResult> {
            // Acquiring IAreaService reference and saving in constant
            const areaService: IAreaService = getService(IAreaService);
            // Displaying data using Info banner
            areaService.showBanner('Info', JSON.stringify(rq), 'BeforeAirAvailability Data');
            // Returning CONTINUE status
            return {
                Status: 'CONTINUE',
                Data: rq
            };
        }
}