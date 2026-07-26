import { gsap } from "gsap";

export function animateCount(element: HTMLElement, start: number, end: number, duration = 2) {
  const obj = { val: start };
  gsap.to(obj, {
    val: end,
    duration: duration,
    ease: "power3.out",
    onUpdate: () => {
      element.innerText = Math.floor(obj.val).toString();
    },
  });
}

export function animateParallax(element: HTMLElement, yPercent = -15, triggerElement?: HTMLElement) {
  gsap.fromTo(
    element,
    { yPercent: 0 },
    {
      yPercent: yPercent,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement || element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );
}

export function animateHoverGlow(element: HTMLElement) {
  element.addEventListener("mouseenter", () => {
    gsap.to(element, {
      boxShadow: "0 0 30px rgba(139, 92, 246, 0.4)", // purple ambient glow
      borderColor: "rgba(139, 92, 246, 0.6)",
      duration: 0.4,
      ease: "power2.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.08)",
      duration: 0.6,
      ease: "power2.out",
    });
  });
}
