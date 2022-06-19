![ElectronVisualPromo](https://user-images.githubusercontent.com/35755386/173193444-2ce2a70c-fd07-421b-98bd-c787badbcd8b.png)

**Web**-based **electron density simulation** single-handedly developed by a **high school student**. Displayed based upon the internal calculations performed that involve the state-of-the-art **Projector Augmented-wave** (PAW) method and **Density Functional Theory** (DFT): describing the **probable locations of electrons** by simplifying the N-body Schrödinger's Equation into a relatively easier-to-compute N single-body problem.

---

## Official Build 4.0

Developed and Designed by **John Seong**. Served under the **MIT** License.

### [Launch Website](https://electronvisual.org)

---

## Useful Links

[View the **Project Scope Statement**](https://github.com/wonmor/ElectronVisualized/blob/main/docs/John%20Seong%20-%20ICS3%20Project%20Scope%20Statement%20-%20ElectronVisualized.pdf)

[Contact Me via **LinkedIn**](https://www.linkedin.com/in/john-seong-9194321a9)

---

<img width="1200" alt="Screen Shot 2022-06-18 at 3 00 56 AM" src="https://user-images.githubusercontent.com/35755386/174426800-9100bc8e-6158-4668-b1b2-d741b9ded6c5.png">

<img width="1200" alt="Screen Shot 2022-06-14 at 1 38 26 PM" src="https://user-images.githubusercontent.com/35755386/173641984-e52deac1-2930-4a66-8693-2564242a766b.png">

<img width="1200" alt="Screen Shot 2022-06-14 at 1 37 51 PM" src="https://user-images.githubusercontent.com/35755386/173641815-9876aaf1-465f-4f58-98a7-36bd390b1948.png">

---

## Project Sketches

These sketches were drawn at the early stage of development.

![IMG_7647](https://user-images.githubusercontent.com/35755386/166985579-96c2d483-e74c-4802-ac92-762b2ccc8bc9.jpg)

<img width="1200" alt="Screen Shot 2022-06-05 at 10 10 18 PM" src="https://user-images.githubusercontent.com/35755386/172083147-e11ab873-f156-4dda-8d26-71652a1de0c8.png">

---

## Technologies Used

### Front-End: ```./client```
- **React**: Front-End Javascript Library
- **React-Three-Fiber**: JavaScript 3D Library for React
- **Redux**: An Open-Source JavaScript Library for Managing and Centralizing Application State
- **Tailwind CSS**: A Utility-First Cascading Style Sheets Framework
- **Headless UI** and **MUI**: UI Component Libraries

---

### Back-End: ```./server```
- **Flask**: Python Microframework for Web — *INSTALL VIA **PIP***
- **Docker**: OS-level Virtualization — *INSTALL ON THEIR **WEBSITE** THROUGH GUI INSTALLER* *(FOR **HEROKU** DEPLOYMENT ONLY)*
- **NumPy** and **SciPy**: Core Libraries for Scientific Computing — *INSTALL VIA **PIP***
- **ASE**: Atomic Simulation Environment — *INSTALL VIA **PIP***
- *A **MUST** INSTALL BEFORE **GPAW*** — **Libxc**: The Electronic Structure Library for DFT (Density Functional Theory) — *INSTALL VIA **BREW**, **APT**, OR **CHOCOLATEY***
- *A **MUST** INSTALL BEFORE **GPAW*** — **BLAS**: Basic Linear Algebra Subprograms — *INSTALL VIA **BREW**, **APT**, OR **CHOCOLATEY***
- **GPAW**: Projector-Augmented Wave Extension for ASE (Pseudo Wave Function Generator) — *INSTALL VIA **PIP***
- **SQLAlchemy**: An Open-Source SQL Toolkit — *INSTALL VIA **PIP***

---

## How to Run Locally

**DISCLAIMER**: The reason it's unnecessarily convoluted is due to one of the dependencies: **GPAW** not being designed for web-based apps but only for local builds. There was no documentation, support, or previous cases of deployments on the web, so I had to come up with my own solution. 

---

1. Install **C-based dependencies** BLAS and Libxc globally, e.g. using ```brew``` on macOS or other package managers like ```APT``` on Linux or ```Chocolatey``` on Windows (Heroku runs on top of Ubuntu by default, so in this case, I set up a ```Dockerfile``` to ```apt-get install```. A bit of trial and error were involved in the process of finding the right method, as Heroku's official ```APT buildpack``` was not suitable for deploying applications that involve scientific computing (modules such as SciPy or GPAW)
2. Setup the **client-side**: ```cd client && npm install```
3. ```yarn build``` to convert React ```*.JSX``` into production files that Flask (our back-end) can read
4. Setup the **server-side**: On a **seperate** terminal, go to the ```root``` folder, and set up a virtual environment
5. **OPTIONAL**: ```gpaw install-data <dir>``` if you would like to generate your own version of GPAW datasets; otherwise, use the one that is pre-packaged in this repo
6. Run ```export GPAW_SETUP_PATH=~/gpaw-setups-<version>``` to direct the API to the GPAW datasets that are rendered in **step 5** (or use the one that is already included in this repo)
7. Just as a side note, **Step 6** when deploying on Heroku can be replaced by setting an environment variable in the ```CONFIG_VAR``` menu on the dashboard (Just set it to ```GPAW_SETUP_PATH=server/datasets/gpaw-setups-0.9.20000``` if you don't know what you're doing)
8. Execute ```pip3 install requirements.txt && cd client && yarn start-api``` to download all the **PyPi dependencies** as well as running the Flask server (Optionally, you can go to the ```root``` folder and execute ```flask run``` instead)
