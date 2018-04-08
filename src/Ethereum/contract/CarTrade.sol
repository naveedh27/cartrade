pragma solidity ^0.4.19;


contract CarTrade{

    struct Car{
        string brand;
        string model;
        string desc;
        address owner;
    }

     mapping (address => uint) public registeredMap;
     Car[] public listOfCars;



     struct Order{
        string brand;
        string model;
        string desc;
        address owner;
        string status;
        uint bidPrice;
     }

     mapping (address => uint) public  OrderMap;
     Order[] public listOfOrder;
     address[] public orderArr;

     function CarTrade() public{
          Car memory reg = Car({
                brand : '',
                model : '',
                desc : '',
                owner : msg.sender
            });

        registeredMap[msg.sender] = listOfCars.length;
        listOfCars.push(reg);

         Order memory regOr = Order({
                brand : '',
                model : '',
                desc : '',
                owner : msg.sender,
                status : '',
                bidPrice : 0
            });

        OrderMap[msg.sender] = listOfOrder.length;
        listOfOrder.push(regOr);
     }


     function register(string brand,string model, string desc) public {

         Car memory reg = Car({
                brand : brand,
                model : model,
                desc : desc,
                owner : msg.sender
            });

        registeredMap[msg.sender] = listOfCars.length;
        listOfCars.push(reg);

     }

     function getMyCar() public view returns(string,string,string){


         uint index = registeredMap[msg.sender];
         Car memory myCar = listOfCars[index];
         require(myCar.owner == msg.sender);
         return(myCar.brand,myCar.model,myCar.desc);

     }


      function sellMyCar(uint bidPrice) public{

         uint index = registeredMap[msg.sender];
         require(index > 0);
         Car memory myCar = listOfCars[index];

         Order memory newOrder = Order({
                 brand : myCar.brand,
                 model : myCar.model,
                 desc : myCar.desc,
                 owner : msg.sender,
                 status : 'Pending',
                 bidPrice : bidPrice
         });

        OrderMap[msg.sender] = listOfOrder.length;
        listOfOrder.push(newOrder);
        orderArr.push(msg.sender);

     }

     function buyCar(address owner) public payable{

        uint index = OrderMap[owner];
        require(index > 0);

        require( listOfOrder[index].bidPrice <= msg.value);
        listOfCars[registeredMap[owner]].owner = msg.sender;


        registeredMap[msg.sender] = listOfCars.length;
        listOfCars.push(listOfCars[registeredMap[owner]]);

        //listOfOrder[index].owner = msg.sender;
        listOfOrder[index].status = 'Completed';


       // delete OrderMap[owner];
        delete  registeredMap[owner];

        address(owner).transfer(msg.value);
     }

    function allSellerAddress() public view returns(address[]){
        return orderArr;
    }
}
