const EARLY_QUIZ_IMAGES = [
  "/quiz/1-removebg-preview.png",
  "/quiz/2-removebg-preview.png",
];

const MALE_BODY_IMAGES = [
  "/docs/transparent/11.svg",
  "/docs/transparent/12.svg",
  "/docs/transparent/13.svg",
  "/docs/transparent/14.svg",
  "/docs/transparent/15.svg",
  "/docs/transparent/16.svg",
  "/docs/transparent/17.svg",
  "/docs/transparent/18.svg",
];

const FEMALE_BODY_IMAGES = [
  "/docs/transparent/3.svg",
  "/docs/transparent/4.svg",
  "/docs/transparent/5.svg",
  "/docs/transparent/6.svg",
  "/docs/transparent/7.svg",
  "/docs/transparent/8.svg",
  "/docs/transparent/9.svg",
  "/docs/transparent/10.svg",
];

const INFO_BLOCK_IMAGES = [
  "/quiz/blue-zones.png",
  "/quiz/3.png",
  "/quiz/mediterranean-spread.png",
];

const BMI_IMAGES_MALE = ["/quiz/47.svg", "/quiz/48.svg", "/quiz/49.svg"];
const BMI_IMAGES_FEMALE = ["/quiz/50.svg", "/quiz/51.svg", "/quiz/52.svg"];

const preloaded = new Set<string>();

function preloadImage(src: string): void {
  if (preloaded.has(src) || typeof window === "undefined") return;
  preloaded.add(src);

  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => {
      const img = new window.Image();
      img.src = src;
    });
  } else {
    setTimeout(() => {
      const img = new window.Image();
      img.src = src;
    }, 1);
  }
}

function preloadImages(images: string[]): void {
  images.forEach(preloadImage);
}

export function preloadForGender(gender: "male" | "female"): void {
  preloadImages(EARLY_QUIZ_IMAGES);

  if (gender === "male") {
    preloadImages(MALE_BODY_IMAGES);
    preloadImages(BMI_IMAGES_MALE);
  } else {
    preloadImages(FEMALE_BODY_IMAGES);
    preloadImages(BMI_IMAGES_FEMALE);
  }
}

export function preloadInfoImages(): void {
  preloadImages(INFO_BLOCK_IMAGES);
}

export function preloadBmiImages(gender: "male" | "female"): void {
  if (gender === "male") {
    preloadImages(BMI_IMAGES_MALE);
  } else {
    preloadImages(BMI_IMAGES_FEMALE);
  }
}

export function preloadQuizImages(): void {
  preloadImages(EARLY_QUIZ_IMAGES);
  preloadImages(MALE_BODY_IMAGES);
  preloadImages(FEMALE_BODY_IMAGES);
  preloadImages(INFO_BLOCK_IMAGES);
  preloadImages(BMI_IMAGES_MALE);
  preloadImages(BMI_IMAGES_FEMALE);
}
