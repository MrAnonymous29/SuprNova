                            // getMembershipAndAccount apex Class Created By Sumit M

// This class is declared as public and uses the with sharing keyword to enforce the sharing rules of the current user
public with sharing class getMembershipAndAccount {
   
    @AuraEnabled(cacheable=true)
    public static List<Membership__c> getMembershipAndAccountMethod() {
        // Get the ID of the current user
        Id currentUserId = UserInfo.getUserId();

        // Retrieve the AccountId from the User object
     
        Id userAccountId = [SELECT AccountId FROM User WHERE Id = '0055j00000BLqLPAA1'].AccountId;
        // Log the userAccountId for debugging purposes
        SYSTEM.debug('userAccountId ' + userAccountId);

        // Query the Membership__c records related to the current user's account
        // This SOQL query gets the Id, Name, Membership_Created_Date__c, Financial_Product__r.Name, and Balance__c fields from the Membership__c records where the Member__c field matches the userAccountId
        List<Membership__c> Membership = [SELECT Id, Name,Membership_Created_Date__c,Financial_Product__r.Name,Balance__c,Member__r.Name,Member__r.AccountNumber,Member__r.Industry,Member__r.Type FROM Membership__c WHERE Member__c = '0015j00001WGOKyAAP'];
        // Return the list of Membership__c records
        return Membership;
    }
}
