# Storyscape - Redefining Social Media Engagement

> **(UPDATE)** - with the latest dependencies updates, you will have to do some small config changes.

Storyscape is an innovative social media platform designed to facilitate seamless content sharing, connectivity, and engagement on a global scale. This repository serves as the central hub for technical documentation and resources essential for understanding and integrating with Storyscape's robust functionalities.

## Table of Contents

- [Introduction](#introduction)
- [Technologies Used](#technologies-used)
- [Features and Functionalities](#features-and-functionalities)
- [Demo](#demo)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [AppWrite Schema](#appwrite-schema)
  - [Database Name: Storyscape](#database-name-storyscape)
  - [Profile Collection](#profile-collection)
  - [Post Collection](#post-collection)
  - [Like Collection](#like-collection)
  - [Comment Collection](#comment-collection)
  - [Storage Name: Storyscape](#storage-name-storyscape)
  - [Bucket](#bucket)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Storyscape leverages cutting-edge technologies to provide users with an immersive social media experience. By utilizing TypeScript, React, Next.js, Tailwind CSS, and other advanced tools, Storyscape aims to redefine user interaction with content, fostering meaningful connections within a vibrant online community.

## Technologies Used

Storyscape utilizes a variety of technologies to deliver its comprehensive set of features. The primary technologies include:

- **TypeScript**: A typed superset of JavaScript that enhances code quality and developer productivity.
- **React**: A popular JavaScript library for building user interfaces.
- **Next.js**: A React framework that enables server-side rendering and efficient, SEO-friendly web applications.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs.
- **Zustand**: A minimalistic state management library for React applications.
- **AppWrite**: An open-source backend server providing API services for authentication, database, and storage.
- **Debounce**: A utility for optimizing performance by limiting the frequency of function calls.
- **Image-js**: A JavaScript library for handling image processing tasks.
- **Moment**: A library for parsing, validating, manipulating, and displaying dates and times.
- **React-advanced-cropper**: A React component for image cropping.
- **React-icons**: A library providing popular icon packs for React applications.
- **Context API**: A React feature for managing global state.
- **Canvas**: A web technology for dynamically generating graphics and visual effects.
- **Raw-loader**: A webpack loader for handling raw file imports.

## Features and Functionalities

Storyscape offers a suite of innovative features and functionalities that cater to the needs of modern social media users:

- **Seamless Content Sharing:** Share text, images, videos, and other multimedia content with the community effortlessly.
- **Real-time Connection:** Maintain real-time connections with friends, followers, and groups, fostering engagement and interaction.
- **Engaging Experiences:** Create and engage with interactive stories, polls, and live events.
- **Personalization:** Customize your profile, explore personalized content, and receive tailored recommendations.
- **Community Building:** Join or create groups with shared interests, build meaningful connections, and participate in discussions.
- **Safety and Security:** Employ robust security measures to protect user privacy and ensure a safe and secure environment.
- **Accessibility:** Adhere to accessibility guidelines to provide an inclusive and user-friendly experience for all.

## Demo

Find below a list of sample images showcasing Storyscape's interface and features:

#### Desktop

> Log in
>
> ![Demo log in](/public/demo-images/loginModal.png)
>
> Register
>
> ![Demo register](/public/demo-images/registerModal.png)
>
> Home page
>
> ![Demo home logged in](/public/demo-images/homePageLoggedIn.png)
>
> Home page logged out
>
> ![Demo home logged out](/public/demo-images/homePageLoggedOut.png)
>
> Home page zoomed out
>
> ![Demo home zoomed out](/public/demo-images/homePageZoomOut.png)
>
> Profile page
>
> ![Demo profile page](/public/demo-images/profilePage.png)
>
> Upload page
>
> ![Demo upload page](/public/demo-images/uploadPage.png)
>
> Single post
>
> ![Demo single post](/public/demo-images/post.png)
>
> Upload video
>
> ![Demo upload video](/public/demo-images/uploadVideo.png)
>
> Crop image
>
> ![Demo crop image](/public/demo-images/croppeImage.png)
>
> Edit profile
>
> ![Demo edit profile](/public/demo-images/editProfile.png)
>
> Personal feed
>
> ![Demo personal feed](/public/demo-images/feed.png)
>
> Search results
>
> ![Demo search results](/public/demo-images/searchProfiles.png)
>
> Dropdown menu
>
> ![Demo dropdown menu](/public/demo-images/dropdownMenu.png)

#### Mobile

> Home page
>
> ![Demo home logged in](/public/demo-images/homePageMobile.png)
>
> Profile page
>
> ![Demo profile page](/public/demo-images/profilePageMobile.png)
>
> Upload page
>
> ![Demo upload page](/public/demo-images/uploadPageMobile.png)
>
> Single post
>
> ![Demo single post](/public/demo-images/postMobile1.png) ![Demo single post](/public/demo-images/postMobile2.png)
>
> Personal feed
>
> ![Demo personal feed](/public/demo-images/feedMobile.png)

## Installation

To set up Storyscape locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.

```bash
cd storyscape
```

3. Install the dependencies.

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Start the development server.

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Access Storyscape at `http://localhost:3000`.

## Environment Variables

Configure the following environment variables in your `.env` file:

```bash
NEXT_PUBLIC_APPWRITE_URL='https://cloud.appwrite.io/v1'
NEXT_PUBLIC_ENDPOINT=''
NEXT_PUBLIC_DATABASE_ID=''

NEXT_PUBLIC_COLLECTION_ID_PROFILE=''
NEXT_PUBLIC_COLLECTION_ID_POST=''
NEXT_PUBLIC_COLLECTION_ID_LIKE=''
NEXT_PUBLIC_COLLECTION_ID_COMMENT=''

NEXT_PUBLIC_BUCKET_NAME="Storyscape"
NEXT_PUBLIC_BUCKET_ID=''
NEXT_PUBLIC_PLACEHOLDER_DEFAULT_IMAGE_ID=''
```

## AppWrite Schema

### Database Name: Storyscape

### Profile Collection:

| Key           | Type   |
| ------------- | ------ |
| `Document ID` | String |
| `image`       | String |
| `bio`         | String |
| `user_id`     | String |
| `name`        | String |

Profile Indexes:
| KEY | TYPE | ATTRIBUTE | ASC/DESC |
| ------------- | ------------- | ------------- | ------------- |
| user_id | key | user_id | asc |
| name | fulltext | name | asc |

Profile Settings (Update Permissions):
| Add Role | PERMISSIONS |
| ------------- | ------------- |
| All guests | Read |
| All users | Create, Read, Update, Delete |

### Post Collection:

| Key           | Type   |
| ------------- | ------ |
| `Document ID` | String |
| `user_id`     | String |
| `video_url`   | String |
| `text`        | String |
| `created_at`  | String |

Post Indexes:
| KEY | TYPE | ATTRIBUTE | ASC/DESC |
| ------------- | ------------- | ------------- | ------------- |
| user_id | key | user_id | asc |

Profile Settings (Update Permissions):
| Add Role | PERMISSIONS |
| ------------- | ------------- |
| All guests | Read |
| All users | Create, Read, Update, Delete |

### Like Collection:

| Key           | Type   |
| ------------- | ------ |
| `Document ID` | String |
| `user_id`     | String |
| `post_id`     | String |

Like Indexes:
| KEY | TYPE | ATTRIBUTE | ASC/DESC |
| ------------- | ------------- | ------------- | ------------- |
| user_id | key | user_id | asc |
| id | unique | id | asc |
| post_id | key | post_id | asc |

Like Settings (Update Permissions):
| Add Role | PERMISSIONS |
| ------------- | ------------- |
| All guests | Read |
| All users | Create, Read, Update, Delete |

### Comment Collection:

| Key           | Type   |
| ------------- | ------ |
| `Document ID` | String |
| `user_id`     | String |
| `post_id`     | String |
| `text`        | String |
| `created_at`  | String |

Comment Indexes:
| KEY | TYPE | ATTRIBUTE | ASC/DESC |
| ------------- | ------------- | ------------- | ------------- |
| post_id | key | post_id | asc |

Comment Settings (Update Permissions):
| Add Role | PERMISSIONS |
| ------------- | ------------- |
| All guests | Read |
| All users | Create, Read, Update, Delete |

### Storage Name: Storyscape

### Bucket:

bucket Settings (Update Permissions):
| Add Role | PERMISSIONS |
| ------------- | ------------- |
| All guests | Read |
| All users | Create, Read, Update, Delete |

## Contributing

Contributions to Storyscape are welcome! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/improvement`).
3. Make your changes and commit them (`git commit -am 'Add feature/improvement'`).
4. Push to the branch (`git push origin feature/improvement`).
5. Create a pull request explaining your changes.

## License

Storyscape is licensed under the `MIT` License. See [LICENSE](https://github.com/storyscape/storyscape/blob/main/LICENSE) for more information.
