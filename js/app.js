let showAllLimit;
const loadData = async (limit = 0, isSort) => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data, limit, isSort);
};

const displayData = (data, limit, isSort) => {
  const parentDiv = document.getElementById("cardsContainer");
  parentDiv.innerHTML = "";
  let allData;
  if (limit > 0) {
    allData = data.data.tools;
  } else {
    allData = data.data.tools.slice(0, 6);
  }
  if (isSort === true) {
    allData.sort(function (a, b) {
      return new Date(a.published_in) - new Date(b.published_in);
    });
    console.log(allData);
  }
  document.getElementById("mySpinner").classList.add("d-none");
  document.getElementById("mySpinner1").classList.add("d-none");
  allData.forEach((element) => {
    const child1 = document.createElement("div");
    child1.classList.add("col");
    child1.innerHTML = `  <div class="card h-100 p-3 p-md-4">
    <img
      src="${element.image ? element.image : "../img/no-Image.jpg"}"
      class="card-img-top"
      alt="No Image Found"
    />
    <div class="card-body">
      <h5 class="card-title">Features</h5>
      <p class="card-text">
        <ol id="${element.id}">          
        </ol>
      </p>
    </div>
    <div class="card-footer">
      <h5 class="card-title">${
        element.name ? element.name : "Name is not available"
      }</h5>
      
      <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><i class=" me-3 fa-sharp fa-regular fa-calendar"></i>${
        element.published_in ? element.published_in : "No Date available"
      }</small>
        <span onclick="myModal('${
          element.id
        }')" class="modalSpan" ><i  data-bs-toggle="modal"
        data-bs-target="#details" class="fa-solid fa-arrow-right"></i></span>
      </div>
    </div>
  </div>`;
    parentDiv.appendChild(child1);
    const featureListParent = document.getElementById(element.id);
    if (element.features.length == 0) {
      const child2 = document.createElement("li");
      child2.innerText = "No features available";
      featureListParent.appendChild(child2);
    }
    element.features.forEach((aFeature) => {
      const child3 = document.createElement("li");
      child3.innerText = aFeature;
      featureListParent.appendChild(child3);
    });
  });
};

document.getElementById("seeMore").addEventListener("click", function () {
  document.getElementById("mySpinner").classList.remove("d-none");
  showAllLimit = 1;
  loadData(showAllLimit);
});

document.getElementById("sort").addEventListener("click", function () {
  document.getElementById("mySpinner1").classList.remove("d-none");
  if (showAllLimit > 0) {
    loadData(showAllLimit, true);
  } else {
    loadData(0, true);
  }
});

const myModal = (id) => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDataInModal(data.data));
};
const displayDataInModal = (obj) => {
  console.log(obj);
  let tempValues = Object.values(obj.features);
  tempValues.forEach((aValue) => {
    console.log(aValue.feature_name);
  });
};

document.getElementById("mySpinner").classList.remove("d-none");
loadData();
