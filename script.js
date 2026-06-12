const FORM_ENDPOINT = "";
const OWNER_EMAIL = "minnie.fasteasy@gmail.com";

const revealItems = document.querySelectorAll(".reveal, .service-card, .news-card, .program-list div, .license-grid div");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const form = document.querySelector("#applicationForm");
const statusEl = document.querySelector("#formStatus");

function formatApplication(formData) {
  const labels = {
    fullName: "Full Name / 姓名",
    phone: "Phone / 電話",
    email: "Email / 電郵",
    language: "Preferred Language / 溝通語言",
    serviceNeeded: "Service Needed / 需要服務",
    propertyUse: "Property Use / 房屋用途",
    propertyCity: "Property City / 物業城市",
    targetPrice: "Target Price / 預算或房價",
    downPayment: "Down Payment / 首付金額",
    creditRange: "Credit Range / 信用分範圍",
    incomeType: "Income Type / 收入類型",
    timeline: "Timeline / 計劃時間",
    notes: "Notes / 補充說明",
  };

  return Object.entries(labels)
    .map(([key, label]) => `${label}: ${formData.get(key) || "Not provided"}`)
    .join("\n");
}

async function submitToEndpoint(payload) {
  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Form endpoint failed");
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const message = formatApplication(formData);
  const subject = `New Client Application - ${formData.get("fullName") || "Website Lead"}`;

  statusEl.textContent = "Preparing your application...";

  if (FORM_ENDPOINT) {
    try {
      await submitToEndpoint({
        subject,
        ownerEmail: OWNER_EMAIL,
        submittedAt: new Date().toISOString(),
        application: Object.fromEntries(formData.entries()),
      });
      statusEl.textContent = "Application sent. Minnie Chen will follow up soon.";
      form.reset();
      return;
    } catch (error) {
      statusEl.textContent = "Online submission is not available. Opening email instead.";
    }
  }

  const mailto = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  window.location.href = mailto;
  statusEl.textContent = "Your email app should open with the application details ready to send.";
});
