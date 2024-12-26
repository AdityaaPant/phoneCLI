/*
create 
    link to the json folder 
    create object to store data in json(data have a name and mobile number)
    2 parameters name and phone number 


read 
    fetch the data from json folder 
    list out the data after command


update 
    get number or name from the user 
    update the number or name 

delete  
    ask for the id of the 




    ** create a random id for each user**
*/
const fs = require("fs");
const { Command } = require("commander");

function readJsonFile() {
	const contents = fs.readFileSync("phone.json");
	const jsonArray = JSON.parse(contents);
	return jsonArray;
}
function writeJsonFile(arrayObject) {
	fs.writeFileSync("phone.json", JSON.stringify(arrayObject));
}

const program = new Command();

program.name("phone").description("CLI to save phone numbers").version("1.0.0");
program
	.command("list")
	.description("list all the existing numbers")
	.action(() => {
		const jsonArray = readJsonFile();
		console.log(jsonArray);
	});

program
	.command("add")
	.description("add a phone number")
	.argument("<useName>", "enter the name ")
	.argument("<phoneNumber>", "enter the phone number ")
	.action((userName, phoneNumber) => {
		const arrayObject = readJsonFile();
		// arrayObject.push(userName, phoneNumber);
		arrayObject.push({ name: userName, phoneNumber: phoneNumber });
		console.log(userName, phoneNumber);
		writeJsonFile(arrayObject);
	});

program
	.command("delete")
	.description("delete an existing contact")
	.argument("<index> , delete the task on given index")
	.action((index) => {
		const arrayObject = readJsonFile();
		if (arrayObject[index]) {
			arrayObject.splice(index, 1);

			writeJsonFile(arrayObject);
			console.log("contact deleted successfully");
		} else {
			console.log("no element exists");
		}
	});
program
	.command("update")
	.description("update an existing contact")
	.argument("<index>", "id of existing contact")
	.argument("<userName>", "id of existing contact")
	.argument("<phoneNumber>", "id of existing contact")
	.action((index, userName, phoneNumber) => {
		const arrayObject = readJsonFile();
		if (arrayObject[index]) {
			arrayObject[index] = { userName, phoneNumber };
			writeJsonFile(arrayObject);
			console.log("updated");
		} else {
			console.log("contact doesn't exists");
		}
	});
program.parse();
