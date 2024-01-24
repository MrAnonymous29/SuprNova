public with sharing class ApexController {
     @AuraEnabled(cacheable=true)
    public static List<Contact> findMethod(String paramOne) {
        //  SOQL query here
        List<Contact> records = [SELECT Id, Name FROM Contact WHERE LastName = :paramOne LIMIT 1];
        return records;
    }

     @AuraEnabled
    public static String changeMethod(String paramForChangeOne) {
        // DML operation here
        Contact record = [SELECT Id, ChangedName__c FROM Contact WHERE LastName = :paramForChangeOne LIMIT 1];
        record.ChangedName__c = paramForChangeOne;
        update record;
        return 'Record updated successfully';
    }
}
