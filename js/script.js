/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/* Start with Global variables
studentList has all the li elements that corresponds to each student
itemsToBeDisplayed is the number of studentes to be displayed by page*/
let studentList = document.querySelector('.student-list').children;
const itemsToBeDisplayed = 10;

/* This function displays the li elements according to the range the li elements 
belongs to. This range is calculated using the number of the page the user is visiting.
*/
const displayPage = (list, pageNumber) => {
   for(i = 0; i < list.length; i++){
      /* All the li elements are hidden. */
      list[i].style.display = 'none';
   };
   /* In this part, the range is created and it shows only the li elements
   that belongs to the range*/
   let startIndex = (pageNumber * itemsToBeDisplayed) - itemsToBeDisplayed;
   let endIndex = pageNumber * itemsToBeDisplayed;
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         list[i].style.display = 'block';
      }
   } 
};

/* This function creates the dynamic HTML to display the pagination at the bottom 
of the page. A list of li elements is required as parameter.*/
const createPaginationLinks = (list) => {
  /* HTML elements creation */
  let divPage = document.querySelector('.page');
  let divPagination = document.createElement('div');
  divPagination.className = 'pagination';
  let ulPagination = document.createElement('ul');

  /* Calculation of the totalPages to be display in the bottom of the page. */
  let totalPages = Math.ceil(list.length / itemsToBeDisplayed);
  /* Each pagination element is created adding a href and text contet */
  for (let i = 1; i <= totalPages; i++){
   let liPagination = document.createElement('li');
   let aPagination = document.createElement('a');
   aPagination.href = '#';
   aPagination.textContent = i;
   liPagination.appendChild(aPagination);
   ulPagination.appendChild(liPagination);

   /* By default, when the browser is refreshed, the page number 1 is highlighted */
   if(i === 1){
      aPagination.className = 'active';
   };
   /* Event Listener is added to each li element that belongs to the pagination
   When the users clicks one number, this is highlighted using active class.*/
   liPagination.addEventListener('click', (e) => {
      const aElements = document.querySelectorAll('a');
      const eventTarget = e.target;
      let numberOfPages = parseInt(e.target.textContent);
      displayPage(studentList, numberOfPages);
      for(let i = 0; i < aElements.length; i++){
         aElements[i].classList.remove('active');
         if(eventTarget){
            eventTarget.classList.add('active');
         }
      }
   });
  }
  divPagination.appendChild(ulPagination);
  divPage.appendChild(divPagination);
};

displayPage(studentList, 1);
createPaginationLinks(studentList);

/*
In this section, all the HTML elements required to perform the search are created
*/

const mainPage = document.querySelector('.page');
const divHeader = document.querySelector('.page-header');
const divSearch = document.createElement('div');
divSearch.className = 'student-search';
const inputSearch = document.createElement('input');
const buttonSearch = document.createElement('button');
buttonSearch.textContent = 'Search';
inputSearch.placeholder = 'Search for students...';
divSearch.appendChild(inputSearch);
divSearch.appendChild(buttonSearch);
divHeader.appendChild(divSearch);

/*
Creation of the HTML elements to show "no results" message when the .includes()
method is false
*/
const noResultsDiv = document.createElement('div');
const titleMessage = document.createElement('h2');
titleMessage.textContent = "Your search has not results";
noResultsDiv.appendChild(titleMessage);

/* Function responsible of performing the search. Requires the input value
entered by the user and the list of studentes(users) to be searched. */
const searchPerform = (searchInput, names) =>{
   let counter = 0;
   let filteredNames = [];
   for(let i = 0; i < names.length; i++){
      if(searchInput.value.length !== 0){
         /* Here is a comparison between lowercase strings. This method allows
         comparisons when the users use uppercase letters */
         if(names[i].textContent.toLowerCase()
         .includes(searchInput.value.toLowerCase())){
            studentList[i].style.display = 'block';
            filteredNames.push(studentList[i]);
         } else{
            counter += 1;
            studentList[i].style.display = 'none';
         }

      }  else {
         studentList[i].style.display = 'block';
         filteredNames.push(studentList[i]);
     } 

   }
   /* Here, the current pagination is removed, because a new one 
   will be generated*/
   mainPage.removeChild(document.querySelector('.pagination'));
   displayPage(filteredNames, 1);
   createPaginationLinks(filteredNames);

   /* A counter is added above to compare if the search has results or not */
   if (counter === studentList.length) {
      mainPage.insertBefore(noResultsDiv, mainPage.lastElementChild);
      document.querySelector('.pagination').style.display = 'none';
      noResultsDiv.style.display = 'block';
   } else {
      document.querySelector('.pagination').style.display = 'block';
      noResultsDiv.style.display = 'none';  
   }

}
/* Adding two different listener events to trigger the same function  */
buttonSearch.addEventListener('click', () => {
   searchPerform(inputSearch, studentList);
});

inputSearch.addEventListener('keyup', () => {
   searchPerform(inputSearch, studentList);
});