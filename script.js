let taskTime = null; // Store task time
let selectedFilter = "personal"; // Default filter is "personal"
let tasks = []; // Store all tasks globally

// Add Filter logic
document.getElementById("addFilterBtn").addEventListener("click", () => {
    const colorPicker = document.getElementById("colorPicker");
    colorPicker.click(); // Open color picker

    colorPicker.addEventListener("input", () => {
        const color = colorPicker.value;
        const filterName = prompt("Enter filter name:");
        if (!filterName) return;

        const filterMenu = document.getElementById("filterMenu");
        const addFilterBtn = document.getElementById("addFilterBtn");

        // Create a new filter item
        const newFilter = document.createElement("li");

        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.style.backgroundColor = color;
        dot.setAttribute("data-color", color); // Save the color in data attribute

        // Handle filter selection
        newFilter.addEventListener("click", () => {
            selectedFilter = filterName.toLowerCase();
        });

        newFilter.appendChild(dot);
        newFilter.append(filterName);

        // Insert the new filter above the "Add Filter" button
        filterMenu.insertBefore(newFilter, addFilterBtn);
    });
});

// Handle clicking the clock icon to set the task time
document.getElementById("clockIcon").addEventListener("click", function () {
    const currentTime = prompt("Enter time for the task (e.g., 12:30 PM)");
    if (currentTime) {
        taskTime = currentTime;
    }
});

// Handle pressing Enter to save a task
function handleEnter(event) {
    if (event.key === "Enter") {
        const taskInput = document.getElementById("taskInput");
        const taskList = document.getElementById("taskList");

        if (taskInput.value.trim()) {
            const taskText = taskInput.value;
            const color = document.querySelector(`.dot[data-color="${selectedFilter}"]`)?.getAttribute("data-color") || "#ca88fe";

            // Save task in global array
            tasks.push({
                text: taskText,
                filter: selectedFilter,
                color: color,
                time: taskTime,
            });

            // Display the task below the input box
            const taskItem = document.createElement("li");
            taskItem.classList.add(selectedFilter);

            const taskDot = document.createElement("span");
            taskDot.classList.add("circle");
            taskDot.style.backgroundColor = color;

            const taskTextElement = document.createElement("span");
            taskTextElement.textContent = taskText;

            const taskTimeElement = document.createElement("span");
            taskTimeElement.classList.add("task-time");
            if (taskTime) {
                taskTimeElement.textContent = taskTime;
            }

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.textContent = "X";
            deleteButton.addEventListener("click", () => {
                taskList.removeChild(taskItem);
                tasks = tasks.filter((t) => t.text !== taskText); // Remove task from global array
            });

            taskItem.append(taskDot, taskTextElement, taskTimeElement, deleteButton);
            taskList.appendChild(taskItem);

            // Reset input and focus
            taskInput.value = "";
            taskInput.focus();
            taskTime = null;
        }
    }
}

// Handle displaying Scheduled Tasks
document.getElementById("scheduledTasksBtn").addEventListener("click", () => {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // Clear current content

    const title = document.createElement("h2");
    title.textContent = "Scheduled Tasks";
    mainContent.appendChild(title);

    // Group tasks by filter
    const groupedTasks = tasks.reduce((acc, task) => {
        if (!acc[task.filter]) acc[task.filter] = [];
        acc[task.filter].push(task);
        return acc;
    }, {});
    // Add functionality to display settings
document.querySelector(".sidebar-menu").addEventListener("click", (e) => {
  if (e.target.textContent === "Settings") {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = ""; // Clear current content

    const settingsContainer = document.createElement("div");
    settingsContainer.classList.add("settings-section");

    // Profile Section
    const profileHeading = document.createElement("h2");
    profileHeading.textContent = "Profile";
    settingsContainer.appendChild(profileHeading);

    const profileOptions = document.createElement("ul");
    ["Edit Profile", "Change Password"].forEach((option) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;
      listItem.addEventListener("click", () => alert(`${option} clicked`));
      profileOptions.appendChild(listItem);
    });
    settingsContainer.appendChild(profileOptions);

    // Notification Section
    const notificationHeading = document.createElement("h2");
    notificationHeading.textContent = "Notification";
    settingsContainer.appendChild(notificationHeading);

    const notificationOptions = document.createElement("ul");
    ["Task Notification"].forEach((option) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;
      listItem.addEventListener("click", () => alert(`${option} clicked`));
      notificationOptions.appendChild(listItem);
    });
    settingsContainer.appendChild(notificationOptions);

    // More Section
    const moreHeading = document.createElement("h2");
    moreHeading.textContent = "More";
    settingsContainer.appendChild(moreHeading);

    const moreOptions = document.createElement("ul");
    ["Language", "Country"].forEach((option) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;
      listItem.addEventListener("click", () => alert(`${option} clicked`));
      moreOptions.appendChild(listItem);
    });
    settingsContainer.appendChild(moreOptions);

    // Append the settings container to the main content
    mainContent.appendChild(settingsContainer);
  }
});


    // Render grouped tasks
    for (const filter in groupedTasks) {
        const filterTitle = document.createElement("h3");
        filterTitle.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);
        mainContent.appendChild(filterTitle);

        const taskList = document.createElement("ul");
        taskList.classList.add("tasks");

        groupedTasks[filter].forEach((task) => {
            const taskItem = document.createElement("li");
            taskItem.classList.add(task.filter);

            const taskDot = document.createElement("span");
            taskDot.classList.add("circle");
            taskDot.style.backgroundColor = task.color;

            const taskTextElement = document.createElement("span");
            taskTextElement.textContent = task.text;

            const taskTimeElement = document.createElement("span");
            taskTimeElement.classList.add("task-time");
            if (task.time) {
                taskTimeElement.textContent = task.time;
            }

            taskItem.append(taskDot, taskTextElement, taskTimeElement);
            taskList.appendChild(taskItem);
        });

        mainContent.appendChild(taskList);
    }
});
// Add functionality to display settings
document.querySelector(".sidebar-menu").addEventListener("click", (e) => {
    if (e.target.textContent === "Settings") {
      const mainContent = document.querySelector(".main-content");
      mainContent.innerHTML = ""; // Clear current content
  
      const settingsContainer = document.createElement("div");
      settingsContainer.classList.add("settings-section");
  
      // Profile Section
      const profileHeading = document.createElement("h2");
      profileHeading.textContent = "Profile";
      settingsContainer.appendChild(profileHeading);
  
      const profileOptions = document.createElement("ul");
      ["Edit Profile", "Change Password"].forEach((option) => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.addEventListener("click", () => alert(`${option} clicked`));
        profileOptions.appendChild(listItem);
      });
      settingsContainer.appendChild(profileOptions);
  
      // Notification Section
      const notificationHeading = document.createElement("h2");
      notificationHeading.textContent = "Notification";
      settingsContainer.appendChild(notificationHeading);
  
      const notificationOptions = document.createElement("ul");
      ["Task Notification"].forEach((option) => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.addEventListener("click", () => alert(`${option} clicked`));
        notificationOptions.appendChild(listItem);
      });
      settingsContainer.appendChild(notificationOptions);
  
      // More Section
      const moreHeading = document.createElement("h2");
      moreHeading.textContent = "More";
      settingsContainer.appendChild(moreHeading);
  
      const moreOptions = document.createElement("ul");
      ["Language", "Country"].forEach((option) => {
        const listItem = document.createElement("li");
        listItem.textContent = option;
        listItem.addEventListener("click", () => alert(`${option} clicked`));
        moreOptions.appendChild(listItem);
      });
      settingsContainer.appendChild(moreOptions);
  
      // Append the settings container to the main content
      mainContent.appendChild(settingsContainer);
    }
  });
  
