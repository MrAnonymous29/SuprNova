            // SM Created js for sendMoneyWithRMGPAY 

// Importing necessary modules from the Lightning Web Components (LWC) library
import { LightningElement } from 'lwc';

// Defining a new class 'SendMoneyWithRMGPAY' which extends from 'LightningElement'
export default class SendMoneyWithRMGPAY extends LightningElement {
   
    // Method to handle click events on the first card

    handleclick() {
        console.log("handling click on first card");
    }

    // Method to handle click events on the accordion buttons

    handleOnClick(event) {

        // Get the target element from the event object
        let target = event.target;

        // Check if the target is an SVG, a path, an arrow, a span, or has the class 'content'

        if (target.tagName.toLowerCase() === 'svg' || target.tagName.toLowerCase() === 'path' || target.classList.contains('arrow') || target.tagName.toLowerCase() === 'span' || target.classList.contains('content')) {
            
            // If so, find the closest parent element with the class 'accordion-button'

            target = target.closest('.accordion-button');
        }

        // Toggle the 'active' class on the target element

        target.classList.toggle("active");

        // Get the next sibling element of the target (the content panel of the accordion)

        let panel = target.nextElementSibling;

        // Find the arrow element within the target

        let arrow = target.querySelector('.arrow');

        // Check if the panel is currently displayed

        if (panel.style.display === "block") {

            // If so, hide the panel and change the arrow to point right
            panel.style.display = "none";
            arrow.classList.remove('down');
            arrow.classList.add('right');
        } else {

            // If not, display the panel and change the arrow to point down
            panel.style.display = "block";
            arrow.classList.remove('right');
            arrow.classList.add('down');
        }
    }
}
