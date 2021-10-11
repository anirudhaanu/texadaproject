# Getting Started with texadaproject
Assignment Project for the role Frontend Enginner
This project is live here https://texadaproject.web.app/
In the project directory, you can run:
### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
For Designing UI Components ,Material-UI is used.

## Project Structure
```
src
├── components    ## reusable components may be used anywhere          
├── data          ## dummy data         
├── modules       ## This projects have two main modules- DataTables and ProductCheckout              
├── pages         ## pages contains different modules. Only one page in this project- Home            
├── services      ## Mocking the service request            
├── utils         ## utility functions used through the project
└── App.js        ## entry point


modules
├── DataTables          ## Datatable module          
    ├── components      ## components used in this module.mostly UI components.avoided doing any kind of business logic         
    ├── styles          ## if any seperate style file is needed              
    ├── utils           ## util functions for this module           
    ├── index.js        ## setting up different components and business logics            
├── ProductCheckout     ## utility functions used through the project
      

```

webapp             |  wireframe
:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/6941210/136853351-4fe14b57-9175-41e8-bc4e-e9b00c2dba47.png)  |  ![image](https://user-images.githubusercontent.com/6941210/136854562-8c8a3e94-75f0-4dc3-b2b6-31dcd9bf7d58.png)
 



## Assumptions

#### Price Calculation
A dummy json data is provided for the project. This product data contains two kind of 'availabilty' - true and false. I assumed that only available products can be booked and only unavailable product can be returned. 

When booking , a date range can be choosen and a price can be calcultated. A user then may confirm the checkout or not. If confirmed, then the product's availabilty is false,date range is saved and and this changed is mirrored in the product list.

When returning, things can be a bit tricky for the Json data provided. This dummy data has already some product with avialabity false; and they do not contain any kind of date information.In this case no price could be calculated hence no price is shown in the confirmation or checkout dialog. A may user then may confirm the checkout or not. If confirmed then the product's availabity is true and can be booked again

But things are straightforward for the product whose avialabity is made false by the user in the app. For this kind of scenario a date range is already saved. So Price calculation can be made

#### Durability
Durabity is calculated at two different times. Firstly, at the time of booking using daterange and product type and secondly, at the time of returning if the product type is meter. All these changes are mirrored in the data tables

## Additional Features
* Sorting columns 
* Dense padding for better visibilty
* Reset button for showing table without any sorting
* Notification for data changing event in localstorage
* In Checkout dialog - only available or unavilable products can be selected depending on the Button pressed e.g. Book, Return
* Live cost calculation and date warning when booking products

## Things I wish could be better
* naming convention
* UI components could be made more dumber 
* cleaner code
* documentation
* Greater isolation of business logic and UI

# Things I wish could achieve
* Testing. It is not my strong zone

## Thank You !

