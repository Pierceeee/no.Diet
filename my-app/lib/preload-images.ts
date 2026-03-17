const EARLY_QUIZ_IMAGES = [
  "/quiz/1-removebg-preview.png",
  "/quiz/2-removebg-preview.png",
];

const MALE_BODY_IMAGES = [
  "/docs/bodytype/11.svg",
  "/docs/bodytype/12.svg",
  "/docs/bodytype/13.svg",
  "/docs/bodytype/14.svg",
  "/docs/bodytype/15.svg",
  "/docs/bodytype/16.svg",
  "/docs/bodytype/17.svg",
  "/docs/bodytype/18.svg",
];

const FEMALE_BODY_IMAGES = [
  "/docs/bodytype/3.svg",
  "/docs/bodytype/4.svg",
  "/docs/bodytype/5.svg",
  "/docs/bodytype/6.svg",
  "/docs/bodytype/7.svg",
  "/docs/bodytype/8.svg",
  "/docs/bodytype/9.svg",
  "/docs/bodytype/10.svg",
];

const INFO_BLOCK_IMAGES = [
  "/quiz/blue-zones.png",
  "/quiz/page11.png",
  "/quiz/page12.png",
  "/quiz/3.png",
  "/quiz/mediterranean-spread.png",
];

const BMI_IMAGES_MALE = ["/docs/Bmi/47.svg", "/docs/Bmi/48.svg", "/docs/Bmi/49.svg"];
const BMI_IMAGES_FEMALE = ["/docs/Bmi/50.svg", "/docs/Bmi/51.svg", "/docs/Bmi/52.svg"];

const preloaded = new Set<string>();

function preloadImage(src: string): void {
  if (preloaded.has(src) || typeof window === "undefined") return;
  preloaded.add(src);
  const img = new window.Image();
  img.src = src;
}

function preloadImages(images: string[]): void {
  images.forEach(preloadImage);
}

export function preloadForGender(gender: "male" | "female"): void {
  preloadImages(EARLY_QUIZ_IMAGES);
  preloadImages(INFO_BLOCK_IMAGES);

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

export function preloadAllCommonImages(): void {
  preloadImages(EARLY_QUIZ_IMAGES);
  preloadImages(INFO_BLOCK_IMAGES);
}

export function preloadQuizImages(): void {
  preloadImages(EARLY_QUIZ_IMAGES);
  preloadImages(MALE_BODY_IMAGES);
  preloadImages(FEMALE_BODY_IMAGES);
  preloadImages(INFO_BLOCK_IMAGES);
  preloadImages(BMI_IMAGES_MALE);
  preloadImages(BMI_IMAGES_FEMALE);
}
