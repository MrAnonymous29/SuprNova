import { LightningElement } from 'lwc';

export default class RecordPicker extends LightningElement {
    handleChange( event ) {
        console.log(event.detail.recordId);
        }
}
