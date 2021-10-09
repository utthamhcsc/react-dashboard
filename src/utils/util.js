export class Utils{
    static getFormData(data){
        var formData = new FormData();
  Object.keys(data).map((item) => formData.append(item, data[item]));
  return formData;
    }

    static hasRoleAdmin(val){
        return String(val).toLowerCase().includes('admin')
    }
    static hasRoleAccount(val){
        return String(val).toLowerCase().includes('account')
    }
    static hasRoleInventory(val){
        return String(val).toLowerCase().includes('inventory')
    }
    static indentStatus={"CREATED":1,
    "UPDATED":1,
        "ADMIN_APPROVED":2, 
     "ADMIN_REJECTED":2,"STORE_ISSUED":3,
     'ACCOUNTS_EWAY_BILL_UPDATED':4,
     'STORE_DISPATCHED':5,
     'COMPLETED':9, 'STORE_ACK_INCORRECT':8  , 'STORE_ACK_CORRECT' :8 ,'STORE_ACK':8,
     'SITE_RETURN':7,'SITE_ACK_INCORRECT':6,'SITE_ACK_CORRECT':6,'SITE_ACK':6
    }

    static isEmpty=(val)=>{

        try{
           return Object.keys(val).length==0
        }
        catch(err){
            return true;
        }
    }
    static indentStepByStatus=(val)=>this.indentStatus[val]
}