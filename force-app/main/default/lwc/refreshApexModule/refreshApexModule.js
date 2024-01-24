import { LightningElement, wire, track } from 'lwc';
import findMethod from '@salesforce/apex/ApexController.findMethod';
import changeMethod from '@salesforce/apex/ApexController.changeMethod';
import {refreshApex} from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RefreshApexModule extends LightningElement {
    @track paramForChangeOne;
    @ track parameters;
    

    // Wired Apex result
    _wiredResult;
    connectedCallback(){
        console.log(this.parameters)
    }

    @wire(findMethod, { paramOne: '$paramForChangeOne'})
    wiredCallback(result) {
        this._wiredResult = result;
        console.log(result);
        if (result.data) {
            this.parameters = result.data;
            
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.parameters = undefined;
        }
    }

    // Function to refresh data
    refreshData() {
        return refreshApex(this._wiredResult);
    }

    // Function to change something and then refresh the data
    callFromHtml() {
        console.log('@@@Call from html called');
        console.log('@paramett2222',this.parameters)
        changeMethod({paramForChangeOne: this.paramForChangeOne})
        .then(result => {
            if (result) {
                this.showNotification('success', 'Success Message', '');
            }
            // Refreshing table data using refresh apex
            return this.refreshData();
        })
        .catch(error => {
            console.log(error);
        });
    }

    showNotification(variant, title, message) {
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        });
        this.dispatchEvent(evt);
    }

    handleParamOneChange(event) {
        this.paramForChangeOne = event.target.value;
    }

    
}
