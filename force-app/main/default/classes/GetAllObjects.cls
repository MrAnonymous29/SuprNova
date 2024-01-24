public with sharing class GetAllObjects {

    // The @AuraEnabled annotation makes the method accessible from Lightning component
    @AuraEnabled(cacheable=true)
    public static List<String> getAllObjects() {
        // Initialize a list to hold the names of all accessible, createable, and updateable objects
        List<String> objectNames = new List<String>();

        // Loop through all sObject types in the org
        for(Schema.SObjectType objType : Schema.getGlobalDescribe().Values()) {
            // Get the describe result for the current sObject type
            Schema.DescribeSObjectResult describeResult = objType.getDescribe();

            // Check if the object is accessible, createable, and updateable to ensure it's not a system object
            // Also check if the object has a 'Name' field, if it's updateable and if it's accessible
            if (describeResult.isAccessible() && describeResult.isCreateable() && describeResult.isUpdateable() && 
                describeResult.fields.getMap().containsKey('Name') && 
                describeResult.fields.getMap().get('Name').getDescribe().isUpdateable() && 
                describeResult.fields.getMap().get('Name').getDescribe().isAccessible()) 
                {
                    // If the object meets the criteria, add its name to the list
                    objectNames.add(describeResult.getName());
                 }
        }

        // Sort the list of object names
        objectNames.sort();

        // Return the sorted list of object names
        return objectNames;
    }
}
