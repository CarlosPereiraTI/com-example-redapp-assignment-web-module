import { Module } from 'sabre-ngv-core/modules/Module';
import { ICommandMessageService } from 'sabre-ngv-commsg/services/ICommandMessageService';
import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { getService } from './Context';

export class Main extends Module {
    init(): void {
        super.init();
        // initialize your module here

        this.registerWorkflowsButton();


    }

    private registerWorkflowsButton(): void {
        // Acquiring ExtensionPointService reference and saving in constant
        const xp: ExtensionPointService = getService(ExtensionPointService);

        // Creating Red App Side Panel config and button
        const redAppSidePanelConfig = new RedAppSidePanelConfig([
            // This button calls the "buttonAction" method when clicked
            new RedAppSidePanelButton('Air Availability', 'btn btn-secondary side-panel-button', () => this.buttonAction())
        ]);

        // Finally we are applying our config
        xp.addConfig('redAppSidePanel', redAppSidePanelConfig);
    }



    // This method is defined as async so that await can be used
    private async buttonAction(): Promise<void> {
        // Acquiring ICommandMessageService reference and saving in constant
        const commandMessageService: ICommandMessageService = getService(ICommandMessageService)
        // Sending air availability search from Las Vegas to Los Angeles
        await commandMessageService.send('1LASLAX');
    }
}
