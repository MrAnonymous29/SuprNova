// Import necessary modules from the Lightning Web Components (LWC) and Apex
import { LightningElement,wire,track } from 'lwc';
import getAllObjects from '@salesforce/apex/GetAllObjects.getAllObjects';

// Define the PolymorphicRecordPicker class
export default class PolymorphicRecordPicker extends LightningElement {
    // Track the target objects, selected target, current selected record ID, and loading state
    @track targetObjects = [];
    selectedTarget = '';
    currentSelectedRecordId = null;
    @track isLoading = true;

    // Wire the getAllObjects Apex method to the wiredObjects function
    @wire(getAllObjects)
    wiredObjects({ error, data }) {
        try {
            // If data is returned
            if (data) {
                // Map the data to the targetObjects array
                this.targetObjects = data.map(obj => ({ label: obj, value: obj }));
                // Set the selectedTarget to the first object in the list
                if(this.targetObjects.length > 0) {
                    this.selectedTarget = this.targetObjects[0].value;
                }
                // Log the targetObjects array
                console.log('@@@data',this.targetObjects);
                // Set isLoading to false to hide the loading spinner
                this.isLoading = false; 
            } 
            // If an error occurred
            else if (error) {
                // Log the error
                console.error(error);
                // Set isLoading to false to hide the loading spinner
                this.isLoading = false; 
            }
        } catch (e) {
            console.error('An error occurred: ', e);
        }
    }

    // Getter to determine whether to show the target selector
    get showTargetSelector() {
        // Return true if the currentSelectedRecordId is null
        return this.currentSelectedRecordId === null;
    }

    // Handler for the target selection event
    handleTargetSelection(event) {
        // Set the selectedTarget to the value of the event target
        this.selectedTarget = event.target.value;
    }

    // Handler for the record select event
    handleRecordSelect(event) {
        // Set the currentSelectedRecordId to the record ID from the event detail
        this.currentSelectedRecordId = event.detail.recordId;
    }
}
