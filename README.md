<img width="100" alt="e_logo" src="https://user-images.githubusercontent.com/35755386/171070068-7c1150cc-e908-4c1e-ab11-e05f6e439057.png">

# ElectronVisualized

A **real-time** electron orbital simulation. Displayed based upon the internal calculations performed that involve the famous **Density Functional Theory**, which describes the probable locations of electrons by numerically deriving the wavefunction.

Website is still in the **development** phase but will be completed in a timely manner.

### [Launch Website](https://electron-visualized.herokuapp.com)

---

## Useful Links

[View the **Project Scope Statement**](https://github.com/wonmor/ElectronVisualized/blob/main/docs/John%20Seong%20-%20ICS3%20Project%20Scope%20Statement%20-%20ElectronVisualized.pdf)

---

<img width="1000" alt="Screen Shot 2022-05-31 at 11 50 19 PM" src="https://user-images.githubusercontent.com/35755386/171324066-30705e39-105b-46e0-90e0-defb88971e32.png">

![IMG_7647](https://user-images.githubusercontent.com/35755386/166985579-96c2d483-e74c-4802-ac92-762b2ccc8bc9.jpg)

---

## Technologies Used

### Front-End: ```./client```
- **React**: Front-End Javascript Library
- **Redux**: An Open-Source JavaScript Library for Managing and Centralizing Application State
- **ThreeJS**: JavaScript 3D Library
- **Tailwind CSS**: A Utility-First Cascading Style Sheets Framework

---

### Back-End: ```./server```
- **Flask**: Microframework for Web
- **Matplotlib**: Visualization with Python
- **NumPy** and **SciPy**: Core Libraries for Scientific Computing
- **ASE**: Atomic Simulation Environment 
- **GPAW**: Projector-Augmented Wave Extension for ASE (Pseudo Wave Function Generator)
- **Libxc**: The Electronic Structure Library for DFT (Density Functional Theory)
- **BLAS**: Basic Linear Algebra Subprograms
- **SQLAlchemy**: An Open-Source SQL Toolkit 
- **Docker**: Platform as a Service (PaaS)
- **Heroku APT** Buildpack: Add Support for Apt-Based Dependencies 

---

## How to Run Locally

1. Install **BLAS** and **Libxc** globally, either using ```brew``` or other package managers available on the desired operating system
2. Setup the **client-side**: ```cd client && npm install```
3. ```yarn start build```
4. Setup the **server-side**: On a **seperate** terminal, execute ```cd client && yarn start-api```
