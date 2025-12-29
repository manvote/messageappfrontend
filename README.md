Based on the code we have implemented and the libraries we installed during our session, here is the complete list of dependencies for your `README.md` file.

You can copy and paste this section directly into your project documentation.

---

### 📦 Project Dependencies

This project relies on the following key packages:

#### **Core & UI**

* **react**: Core library.
* **react-native**: Framework for building native apps.
* **react-native-vector-icons**: Used for all icons (Material, Ionicons, etc.) throughout the app (Chat, Search, Back arrows).

#### **Navigation**

* **@react-navigation/native**: Core navigation infrastructure.
* **@react-navigation/native-stack**: Stack navigator for screen transitions (Contacts → NewChat → AddContact).
* **react-native-screens**: (Peer dependency) Optimized screen primitives.
* **react-native-safe-area-context**: (Peer dependency) Handling safe areas on iOS/Android.

#### **Development & Types**

* **typescript**: Static type checking.
* **@types/react-native-vector-icons**: TypeScript definitions for the icon library.

---

### 🚀 Installation & Setup

To install all dependencies, run:

```bash
npm install
# OR
yarn install

```

### ⚠️ Important Configuration Notes

**1. React Native Vector Icons Setup**
This project uses `react-native-vector-icons`. If you encounter missing icon errors on Android, ensure the following line exists in `android/app/build.gradle` (at the very bottom):

```gradle
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

```

**2. Navigation Types**
If you see TypeScript errors regarding `navigation` props, ensure you are importing types correctly or strictly typing the navigation stack in `src/navigation/RootNavigator.tsx`.

---

### 📋 Package.json Snippet

For reference, your `package.json` dependencies section should look similar to this:

```json
"dependencies": {
    "react": "18.x.x",
    "react-native": "0.7x.x",
    "@react-navigation/native": "^6.x.x",
    "@react-navigation/native-stack": "^6.x.x",
    "react-native-safe-area-context": "^4.x.x",
    "react-native-screens": "^3.x.x",
    "react-native-vector-icons": "^10.x.x"
},
"devDependencies": {
    "@types/react": "~18.x.x",
    "@types/react-native": "~0.7x.x",
    "@types/react-native-vector-icons": "^6.x.x",
    "typescript": "^5.x.x"
}

```