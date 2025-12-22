import fs from "node:fs/promises";

const readUserData = async ()=>{
    const filePath = "../data/user_list.json";
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

const readOfficerData = async ()=>{
    const filePath = "../data/officer_list.json";
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
    
};

const readAdminData = async ()=>{
    const filePath = "../data/admin_list.json";
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
};

const isFindsDataUser = (data, username, password)=>{
const isFound = data.user.find((item)=> item.username === username && item.password === password);
return isFound;
};

const isFindsDataOfficer = (data, username, password)=>{
const isFound = data.officer.find((item)=> item.username === username && item.password === password);
return isFound;
};

const isFindsDataAdmin = (data, username, password)=>{
const isFound = data.admin.find((item)=> item.username === username && item.password === password);
return isFound;
};

const loginServices = async (request)=>{
    try {
        const {username,password}= request;
        const result = await Promise.all([readUserData(), readOfficerData(), readAdminData()]);
        const [userData, officerData, adminData] = result;
    
        const userFound = isFindsDataUser(userData, username, password);
        const officerFound = isFindsDataOfficer(officerData, username, password);
        const adminFound = isFindsDataAdmin(adminData, username, password);
    
        if(userFound){
            return userFound
        } else if (officerFound){
            return officerFound
        } else if (adminFound){
            return adminFound
        } else {
            throw new Error ("Invalid username or password");
        }
        
    } catch (error) {
        throw error;
    }
};

export default{loginServices}