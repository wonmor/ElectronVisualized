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

## Technologies Used (A Ton, You're Welcome)

### Front-End: ```./client```
- **React**: Front-End Javascript Library
- **Redux**: An Open-Source JavaScript Library for Managing and Centralizing Application State — *ANNOYING **AF** PLUGIN, BUT I HAD NO OTHER OPTIONS...*
- **ThreeJS**: JavaScript 3D Library
- **Tailwind CSS**: A Utility-First Cascading Style Sheets Framework

---

### Back-End: ```./server```
- **Flask**: Microframework for Web — *INSTALL VIA **PIP***
- **Matplotlib**: Visualization with Python — *INSTALL VIA **PIP***
- **NumPy** and **SciPy**: Core Libraries for Scientific Computing — *INSTALL VIA **PIP***
- **ASE**: Atomic Simulation Environment — *INSTALL VIA **PIP***
- *A **MUST** INSTALL BEFORE **GPAW*** — **Libxc**: The Electronic Structure Library for DFT (Density Functional Theory) — *INSTALL VIA **BREW**, **APT**, OR **CHOCOLATEY***
- *A **MUST** INSTALL BEFORE **GPAW*** — **BLAS**: Basic Linear Algebra Subprograms — *INSTALL VIA **BREW**, **APT**, OR **CHOCOLATEY***
- **GPAW**: Projector-Augmented Wave Extension for ASE (Pseudo Wave Function Generator) — *INSTALL VIA **PIP***
- **SQLAlchemy**: An Open-Source SQL Toolkit — *INSTALL VIA **PIP***
- **Docker**: OS-level Virtualization — *INSTALL ON THEIR **WEBSITE** THROUGH GUI INSTALLER* *(FOR **HEROKU** DEPLOYMENT ONLY)*

---

## How to Run Locally (Extremely Complicated, but Totally Worth it Boys)

**DISCLAIMER**: The reason it's unnecessarily convoluted is due to one of the dependencies: **GPAW** not being designed for web-based apps but only for local builds. There was no documentation, support, or previous cases of deployments on the web, so I had to come up with my own solution. I did not give up until the very end where I succeeded to make the whole computation process **real-time** (for real, no joke)

---

### Steps: Bon Appétit

1. Install **C-based dependencies** BLAS and Libxc globally, e.g. using ```brew``` on macOS or other package managers like ```APT``` on Linux or ```Chocolatey``` on Windows (Heroku runs on top of Ubuntu by default, so in this case, I set up a ```Dockerfile``` to ```apt-get install```. A bit of trial and error were involved in the process of finding the right method, as Heroku's official ```APT buildpack``` was not suitable for deploying applications that involve scientific computing (modules such as SciPy or GPAW)
2. Setup the **client-side**: ```cd client && npm install```
3. ```yarn build``` to convert React ```*.JSX``` into production files that Flask (our back-end) can read
4. Setup the **server-side**: On a **seperate** terminal, go to the ```root``` folder, and set up a virtual environment
5. **OPTIONAL**: ```gpaw install-data <dir>``` if you would like to generate your own version of GPAW datasets; otherwise, use the one that is pre-packaged in this repo
6. Run ```export GPAW_SETUP_PATH=~/gpaw-setups-<version>``` to direct the API to the GPAW datasets that are rendered in **step 5** (or use the one that is already included in this repo)
7. Just as a side note, **Step 6** when deploying on Heroku can be replaced by setting an environment variable in the ```CONFIG_VAR``` menu on the dashboard (Just set it to ```GPAW_SETUP_PATH=server/datasets/gpaw-setups-0.9.20000``` if you don't know what you're doing)
8. Execute ```pip3 install requirements.txt && cd client && yarn start-api``` to download all the **PyPi dependencies** as well as running the Flask server (Optionally, you can go to the ```root``` folder and execute ```flask run``` instead)
