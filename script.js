// TODO: Make it so that I can get the link in the messages
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelector(".modal")?.remove();
  }
});

document.querySelectorAll("i.fa-ellipsis-vertical").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();

    const parentLink = el.closest("a");
    const link = parentLink.getAttribute("href");

    const modal = document.createElement("div");
    modal.classList.add(
      "fixed", "inset-0", "bg-black", "bg-opacity-50",
      "flex", "items-center", "justify-center", "modal", "z-20", "h-[100%]"
    );

    const menu = document.createElement("ul");
    menu.classList.add("bg-[#2226]", "rounded", "p-2");
    menu.innerHTML = `
        <h2> Share The Link! </h2>
        <li><i class="fa-brands fa-x-twitter text-neutral-600"></i><a href="https://x.com/intent/tweet?text=Checkout ${encodeURIComponent(link)}" class="modal-share">Share via X</a></li>
        <li><i class="fa-brands fa-snapchat text-yellow-400"></i><a href="snapchat://add" class="modal-share">Share via Snapchat</a></li>
        <li><i class="fa-brands fa-linkedin text-blue-500"></i><a href="https://www.linkedin.com/shareArticle?url=${encodeURIComponent(link)}" class="modal-share">Share via LinkedIn</a></li>
        <li><i class="fa-regular fa-envelope text-red-500"></i><a href="mailto:?subject=Checkout This Link!&body=${encodeURIComponent(link)}" class="modal-share">Share via Email</a></li>
        <li><i class="fa-brands fa-whatsapp text-green-500"></i><a href="https://wa.me/?text=${encodeURIComponent(link)}" class="modal-share">Share via WhatsApp</a></li>
        <li><i class="fa-solid fa-share"></i><button class="modal-share truncate items-center flex gap-x-2 lg:gap-x-3" id="copy-link-btn">Copy Link <span class="text-[.5em] md:text-[.667em] p-1 bg-gray-600/20 rounded overflow-x-scroll rounded whitespace-pre inline-block w-[10rem] md:w-fit font-mono text-sky-100">${encodeURIComponent(link)}</span></button></li>
      `;

    modal.appendChild(menu);
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Copy link functionality
    document.getElementById("copy-link-btn").onclick = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(() => {
          const button = document.getElementById("copy-link-btn");
          button.innerHTML = 'Copied!';
          setTimeout(() => { button.innerHTML = `Copy Link <span class="text-[.33em] md:text-[.5em] p-1 bg-gray-600/20 rounded overflow-x-scroll rounded whitespace-pre inline-block w-[10rem] md:w-fit">${encodeURIComponent(link)}</span>`; }, 2000);
        });
      } else {
        alert('Your browser does not support the Clipboard API');
      }
    };
  });
});