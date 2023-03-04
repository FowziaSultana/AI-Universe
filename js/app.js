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
    document.getElementById("seeMore").classList.add("d-none");
  } else {
    allData = data.data.tools.slice(0, 6);
    document.getElementById("seeMore").classList.remove("d-none");
  }
  if (isSort === true) {
    allData.sort(function (a, b) {
      return new Date(a.published_in) - new Date(b.published_in);
    });
    // console.log(allData);
  }
  document.getElementById("mySpinner").classList.add("d-none");
  document.getElementById("mySpinner1").classList.add("d-none");
  allData.forEach((element) => {
    const child1 = document.createElement("div");
    child1.classList.add("col");
    child1.innerHTML = `  <div class="card h-100 p-3 p-md-4">
    <img
      src="${element.image ? element.image : "../img/no-Image.jpg"}"
      class="card-img-top " 
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
// ---------------------------------------------see more btn js Started----------------------

document.getElementById("seeMore").addEventListener("click", function () {
  document.getElementById("mySpinner").classList.remove("d-none");
  showAllLimit = 1;
  loadData(showAllLimit);
});

// ---------------------------------------------ShowByDate js Started----------------------

document.getElementById("sort").addEventListener("click", function () {
  document.getElementById("mySpinner1").classList.remove("d-none");
  if (showAllLimit > 0) {
    loadData(showAllLimit, true);
  } else {
    loadData(0, true);
  }
});

// ----------------------------------------------modal js Started----------------------
const myModal = (id) => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDataInModal(data.data));
};

const displayDataInModal = (obj) => {
  // console.log(obj);
  // ----------------------------------------------modal left div js----------------------
  const costDivCreate = (text) => {
    const costChildDiv1 = document.createElement("div");
    costChildDiv1.classList.add("cost");
    costChildDiv1.innerHTML = text;
    costParentDiv.appendChild(costChildDiv1);
  };
  const leftParent = document.getElementById("leftDiv");
  leftParent.innerHTML = "";
  const leftChildDiv = document.createElement("div");
  leftChildDiv.classList.add("card", "h-100", "p-3", "p-md-4");
  leftChildDiv.innerHTML = `  <div class="card-body">
  <h4>
    ${obj.description}
  </h4>
  <div id="costDiv"
    class="d-flex flex-column flex-md-row justify-content-evenly align-items-center gap-2 my-4"
  >
    
  </div>
  <div class="row row-cols-1 row-cols-lg-2 mt-2 g-2 g-md-0">
    <div class="col">
      <h5>Features</h5>
      <div id="modalFeatures"></div>
    </div>
    <div class="col">
      <h5>Integration</h5>
      <div id="modalIntegration"></div>
    </div>
  </div>
</div>`;
  //  -------------------------------------------cost div dynamic-----------------------------
  leftParent.appendChild(leftChildDiv);
  const costParentDiv = document.getElementById("costDiv");
  if (obj.pricing == null) {
    costDivCreate("Free Of Cost/Basic");
    costDivCreate("Free Of Cost/Pro");
    costDivCreate("Free Of Cost/Enterprise");
  } else {
    obj.pricing.forEach((aPrice) => {
      const costChildDiv = document.createElement("div");
      costChildDiv.classList.add("cost");
      costChildDiv.innerHTML = `${
        aPrice.price ? aPrice.price : "Free of Cost/"
      }  ${aPrice.plan} `;
      costParentDiv.appendChild(costChildDiv);
    });
  }

  //  -------------------------------------------Features div dynamic-----------------------------
  const modalFeatures = document.getElementById("modalFeatures");
  modalFeatures.innerHTML = "";
  let tempFeatureValues = Object.values(obj.features);
  if (tempFeatureValues.length != 0) {
    tempFeatureValues.forEach((aValue) => {
      const li = document.createElement("li");
      li.innerText = aValue.feature_name;
      modalFeatures.appendChild(li);
    });
  } else {
    const li = document.createElement("li");
    li.innerText = "No Data Found";
    modalFeatures.appendChild(li);
  }
  //  -------------------------------------------Integration div dynamic-----------------------------
  const modalIntegration = document.getElementById("modalIntegration");
  modalIntegration.innerHTML = "";

  if (obj.integrations != null) {
    obj.integrations.forEach((aValue) => {
      const li1 = document.createElement("li");
      li1.innerText = aValue;
      modalIntegration.appendChild(li1);
    });
  } else {
    const li1 = document.createElement("li");
    li1.innerText = "No Data Found";
    modalIntegration.appendChild(li1);
  }

  // ----------------------------------------------modal right div js----------------------
  let accuracyScore;
  if (obj.accuracy.score != null) {
    accuracyScore = obj.accuracy.score * 100 + "% accuracy";
  } else {
    accuracyScore = null;
  }
  const rightParent = document.getElementById("rightDiv");
  rightParent.innerHTML = "";
  const rightChild = document.createElement("div");
  rightChild.classList.add("card", "h-100", "p-3", "p-md-4");
  rightChild.innerHTML = `<img
  src="${obj.image_link ? obj.image_link[0] : "/img/no-Image.jpg"} "
  class="card-img-top "
  alt="..."
/>
<div id="accuracy">${accuracyScore ? accuracyScore : null}</div>
<div class="card-body text-center">
  <h5 class="card-title">${
    obj.input_output_examples
      ? obj.input_output_examples[0].input
      : "Can you give any example?"
  }</h5>
  <p class="card-text">
    ${
      obj.input_output_examples
        ? obj.input_output_examples[0].output
        : "No! Not Yet! Take a break!!!"
    }
  </p>
</div>`;
  rightParent.appendChild(rightChild);
  let score = document.getElementById("accuracy").innerText;
  if (score === "null") {
    console.log("hey");
    document.getElementById("accuracy").classList.add("d-none");
  } else {
    document.getElementById("accuracy").classList.remove("d-none");
  }
};

// ---------------------------------------------starting js----------------------

document.getElementById("mySpinner").classList.remove("d-none");
loadData();
