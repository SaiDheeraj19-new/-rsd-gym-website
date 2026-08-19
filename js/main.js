(() => {
  const header = document.getElementById("site-header");
  const menuButton = document.getElementById("menu-btn");
  const nav = document.getElementById("nav-links");
  const year = document.getElementById("year");

  const closeMenu = () => {
    if (!nav || !menuButton) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  };

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
      observer.observe(item);
    });
  } else {
    reveals.forEach((item) => item.classList.add("visible"));
  }

  // BMI calculator
  const bmiForm = document.getElementById("bmi-form");
  const bmiResult = document.getElementById("bmi-result");

  if (bmiForm && bmiResult) {
    bmiForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const weight = Number.parseFloat(document.getElementById("weight").value);
      const heightCm = Number.parseFloat(document.getElementById("height").value);

      if (!Number.isFinite(weight) || !Number.isFinite(heightCm) || weight < 1 || heightCm < 50) {
        bmiResult.className = "result-box error";
        bmiResult.textContent = "Enter a valid weight (kg) and height (cm).";
        return;
      }

      const height = heightCm / 100;
      const bmi = weight / (height * height);

      let category = "Obese range";
      if (bmi < 18.5) category = "Underweight range";
      else if (bmi < 25) category = "Normal range";
      else if (bmi < 30) category = "Overweight range";

      bmiResult.className = "result-box";
      bmiResult.innerHTML = `Your BMI is <strong>${bmi.toFixed(1)}</strong> — ${category}.`;
    });
  }

  // Membership plan selection
  const planButtons = document.querySelectorAll(".plan-btn");

  planButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const plan = button.dataset.plan;
      if (!plan) return;

      try {
        window.localStorage.setItem("forgePlan", plan);
      } catch {
        /* Storage can be unavailable in private browsing. */
      }

      button.textContent = `${plan} selected — opening form...`;
      button.disabled = true;

      window.setTimeout(() => {
        window.location.href = `contact.html?plan=${encodeURIComponent(plan)}`;
      }, 380);
    });
  });

  // Contact form
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");
  const planSelect = document.getElementById("plan");

  const readStoredPlan = () => {
    try {
      return window.localStorage.getItem("forgePlan");
    } catch {
      return null;
    }
  };

  if (contactForm && planSelect) {
    const params = new URLSearchParams(window.location.search);
    const requestedPlan = params.get("plan") || readStoredPlan();
    if (requestedPlan) {
      const matchingOption = [...planSelect.options].find((option) => option.value === requestedPlan);
      if (matchingOption) planSelect.value = requestedPlan;
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const goal = document.getElementById("goal").value;
      const plan = planSelect.value;
      const message = document.getElementById("message").value.trim();
      const digits = phone.replace(/\D/g, "");

      const showMessage = (text, type) => {
        if (!formMessage) return;
        formMessage.className = `form-message ${type}`;
        formMessage.textContent = text;
      };

      if (name.length < 2) return showMessage("Please enter your full name.", "error");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return showMessage("Please enter a valid email address.", "error");
      if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) {
        return showMessage("Please enter a valid 10-digit phone number.", "error");
      }
      if (!goal) return showMessage("Please choose your main goal.", "error");
      if (!plan) return showMessage("Please choose a membership plan.", "error");
      if (message.length < 10) return showMessage("Tell us a little more (at least 10 characters).", "error");

      const entry = {
        name,
        email,
        phone,
        goal,
        plan,
        message,
        createdAt: new Date().toISOString()
      };

      try {
        const existing = JSON.parse(window.localStorage.getItem("forgeRegistrations") || "[]");
        const list = Array.isArray(existing) ? existing : [];
        list.unshift(entry);
        window.localStorage.setItem("forgeRegistrations", JSON.stringify(list.slice(0, 25)));
      } catch {
        /* The confirmation still works without storage. */
      }

      showMessage(`Thanks, ${name}. Your ${plan} walkthrough request is saved in this browser.`, "success");
      contactForm.reset();
      planSelect.value = plan;
    });
  }
})();
