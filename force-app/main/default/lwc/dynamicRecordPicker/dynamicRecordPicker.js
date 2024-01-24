import { LightningElement, wire, track } from 'lwc';
import getAllObjects from '@salesforce/apex/GetAllObjects.getAllObjects';

export default class DynamicRecordPicker extends LightningElement {
    @track targetObjects = [];
    selectedTarget = '';
    currentSelectedRecordId = null;
    @track isLoading = true;

    @wire(getAllObjects)
    wiredObjects({ error, data }) {
        if (data) {
            this.targetObjects = data.map(obj => ({ label: obj, value: obj }));
            // Set the selectedTarget to the first object in the list
            if(this.targetObjects.length > 0) {
                this.selectedTarget = this.targetObjects[0].value;
            }
            console.log('@@@data',this.targetObjects);
            this.isLoading = false; 
        } else if (error) {
            console.error(error);
            this.isLoading = false; 
        }
    }

    //To hide combobox
    get showTargetSelector() {
        return this.currentSelectedRecordId === null;
    }

    handleTargetSelection(event) {
        this.selectedTarget = event.target.value;
    }

    handleRecordSelect(event) {
        this.currentSelectedRecordId = event.detail.recordId;
    }
}
