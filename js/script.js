/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
let studentList = document.querySelector('.student-list').children;
const itemsToBeDisplayed = 10;

const displayPage = (list, pageNumber) => {
   for(i = 0; i < list.length; i++){
      list[i].style.display = 'none';
   };
   let startIndex = (pageNumber * itemsToBeDisplayed) - itemsToBeDisplayed;
   let endIndex = pageNumber * itemsToBeDisplayed;
   for(let i = 0; i < list.length; i++){
      if(i >= startIndex && i < endIndex){
         list[i].style.display = 'block';
      }
   } 
};

const createPaginationLinks = (list) => {
  let divPage = document.querySelector('.page');
  let divPagination = document.createElement('div');
  divPagination.className = 'pagination';
  let ulPagination = document.createElement('ul');

  let totalPages = Math.ceil(list.length / itemsToBeDisplayed);

  for (let i = 1; i <= totalPages; i++){
   let liPagination = document.createElement('li');
   let aPagination = document.createElement('a');
   aPagination.href = '#';
   aPagination.textContent = i;
   liPagination.appendChild(aPagination);
   ulPagination.appendChild(liPagination);

   if(i === 1){
      aPagination.className = 'active';
   };

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

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

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

const searchPerform = (searchInput, names) =>{
   let counter = 0;
   let filteredNames = [];
   console.log(searchInput);
   console.log(names);
   for(let i = 0; i < names.length; i++){
      if(searchInput.value.length !== 0){
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
   createPaginationLinks(filteredNames);
}

buttonSearch.addEventListener('click', () => {
   searchPerform(inputSearch, studentList);
});


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/





// Remember to delete the comments that came with this file, and replace them with your own code comments.