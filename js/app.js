const loadData = async (limit = 0) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data, limit);
};

const displayData = (data, limit) => {
  const parentDiv = document.getElementById("cardsContainer");
  parentDiv.innerHTML = "";
  let allData;
  if (limit > 0) {
    allData = data.data.tools;
  } else {
    allData = data.data.tools.slice(0, 6);
  }
  document.getElementById("mySpinner").classList.add("d-none");
  allData.forEach((element) => {
    console.log(element);

    const child1 = document.createElement("div");
    child1.classList.add("col");
    child1.innerHTML = `  <div class="card h-100">
    <img
      src="${element.image}"
      class="card-img-top"
      alt=""
    />
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <p class="card-text">
        <ol id="${element.id}">
          
        </ol>
      </p>
    </div>
    <div class="card-footer">
      <h5 class="card-title">${element.name}</h5>
      
      <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><i class=" me-3 fa-sharp fa-regular fa-calendar"></i>${element.published_in}</small>
        <span class="modalSpan" ><i  data-bs-toggle="modal"
        data-bs-target="#details" class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  </div>`;
    parentDiv.appendChild(child1);
    const featureListParent = document.getElementById(element.id);
    element.features.forEach((aFeature) => {
      const child2 = document.createElement("li");
      child2.innerText = aFeature;
      featureListParent.appendChild(child2);
    });
  });
};

document.getElementById("seeMore").addEventListener("click", function () {
  document.getElementById("mySpinner").classList.remove("d-none");
  loadData(1);
  // alert("jahgd");
});

document.getElementById("sort").addEventListener("click", function () {
  document.getElementById("mySpinner").classList.remove("d-none");
  loadData(1);
  // alert("jahgd");
});

document.getElementById("mySpinner").classList.remove("d-none");
loadData();
