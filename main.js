let students = [];
let currentPage = 1;
const rowsPerPage = 5;

const addInfo = (event) => {
    event.preventDefault();

    const student = {
        name: document.getElementById('name').value,
        lastName: document.getElementById('lastName').value,
        dni: document.getElementById('dni').value
    };
    students.push(student);

    document.getElementById('name').value = null;
    document.getElementById('lastName').value = null;
    document.getElementById('dni').value = null;
    showStudents();
};

const showStudents = () => {

    const tbodyElement = document.getElementsByTagName('tbody')[0];
    tbodyElement.innerHTML = '';

    //calculo los estudiantes a mostrar por cada pagina
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedStudents = students.slice(start, end);

    paginatedStudents.forEach((student) => {
        const trElement = document.createElement('tr');
        trElement.innerHTML = `<td>${student.name}</td><td>${student.lastName}</td><td>${student.dni}</td>`;
        tbodyElement.appendChild(trElement);
    });
    displayPagination();      
};

const displayPagination = () => {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(students.length / rowsPerPage); //calculo el total de paginas

    for(let i = 1; i <= totalPages; i++){
        const btn = document.createElement('button'); //crea los botones dependiendo la cantidad de paginas
        btn.innerHTML = i;
        btn.classList.add('pagination-btn'); //Añade la clase CSS pagination-btn para estilizar los botones 

        if(i == currentPage){
            btn.classList.add('active'); //resalta la pagina actual
        }
        btn.addEventListener('click', () => { //Aquí se añade un "listener" al botón para que, cuando se haga clic en él, se ejecute una acción.
            currentPage = i; //Cuando el usuario hace clic en un botón de página, actualizamos la variable
            showStudents();
        });
        paginationContainer.appendChild(btn);
    }

};

const handleSearch = () => {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    filteredStudents = students.filter((student) => {
        return student.name.toLowerCase().startsWith(searchInput) ||
               student.lastName.toLowerCase().startsWith(searchInput) ||
               student.dni.startsWith(searchInput);
    });
    currentPage = 1; // Reiniciar la paginación al hacer una búsqueda
    showStudents();
};
document.getElementById('searchInput').addEventListener("input", handleSearch);