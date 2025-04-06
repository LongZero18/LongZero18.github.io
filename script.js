const projectContainer = document.getElementById("project-container");

projects.forEach(project => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("col");
    projectCard.innerHTML = `
        <div class="card h-100 project-card">
            <img src="${project.imageUrl}" class="card-img-top" alt="${project.title}">
            <div class="card-body">
                <h5 class="card-title">${project.title}</h5>
                <p class="card-text">${project.description}</p>
                <a href="${project.link}" class="btn btn-primary">Ver Proyecto</a>
            </div>
        </div>
    `;
    projectContainer.appendChild(projectCard);
});

// Agrega la estructura de la grilla de Bootstrap al contenedor
projectContainer.classList.add("row", "row-cols-1", "row-cols-md-3", "g-4");