![ElectronVisualPromo](https://user-images.githubusercontent.com/35755386/173193444-2ce2a70c-fd07-421b-98bd-c787badbcd8b.png)

# ElectronVisualized

Web-based **atomic** and **molecular** orbitals viewer developed by a high school student, using spherical harmonics and Density Functional Theory formulas.

---

## Official Build 6.0

Developed and Designed by **John Seong**. Served under the **MIT** License.

### [Launch Web App](https://electronvisual.org)

[Download on the **Mac App Store**](https://apps.apple.com/us/app/electronvisualized/id1631246652?mt=12)

---

## Atomic Orbitals

**ElectronVisualized** uses the **spherical harmonics** formula to accurately depict the shape of each atomic orbital based upon its four quantum numbers. Each dot represent a probable location of where an electron might be.

<img width="1200" alt="Screenshot 2022-09-11 at 11 42 22 AM" src="https://user-images.githubusercontent.com/35755386/189536680-670cd641-9dcf-4f37-8561-614daeeb55a5.png">

<img width="1200" alt="Screenshot 2022-09-11 at 11 41 49 AM" src="https://user-images.githubusercontent.com/35755386/189536771-6bc97dde-04ba-4f90-a04c-bd9364ecd515.png">

---

## Molecular Orbitals

Thanks to **Density Functional Theory** and **GPAW** library, we were able to derive the electron density of a molecule without going through complex steps of solving a N-dimensional Schrödinger's Equation.

<img width="1200" alt="Screenshot 2022-09-11 at 11 40 50 AM" src="https://user-images.githubusercontent.com/35755386/189536707-bd26705b-e6ba-4081-9bd1-6f65f5045466.png">

<img width="1200" alt="Screenshot 2022-09-11 at 11 41 16 AM" src="https://user-images.githubusercontent.com/35755386/189536719-d6728d78-6845-4d7a-9113-a1287e9a8329.png">

---

## World Engine REST API Guide

### ```https://electronvisual.org/api/load/<molecule_name_goes_here>```

Loads the x, y, and z coordinates of a **molecule** based upon the **DFT** calculations, all from the Amazon S3 server with blazingly fast speed guaranteed.

### ```https://electronvisual.org/api/loadSPH/<atom_name_goes_here>```

Retrieves the x, y, and z coordinates of an individual **atom** derived from the **Spherical Harmonics** formula. This might take a little more time as it is more precise and contains significantly more information.

***P/S: Remove the '<>' brackets upon its actual usage!***

---

## Project Sketches

These sketches were drawn at the early stage of development.

![IMG_7647](https://user-images.githubusercontent.com/35755386/166985579-96c2d483-e74c-4802-ac92-762b2ccc8bc9.jpg)

<img width="1200" alt="Screen Shot 2022-06-05 at 10 10 18 PM" src="https://user-images.githubusercontent.com/35755386/172083147-e11ab873-f156-4dda-8d26-71652a1de0c8.png">

---

## Technologies Used

### Front-End: ```./client```
- **React**: A Front-End Javascript Library
- **React Three Fiber** and **Postprocessing**: WebGL 3D Libraries for React
- **React Redux**: An Open-Source JavaScript Library for Managing and Centralizing Application State
- **Tailwind CSS**: A Utility-First Cascading Style Sheets Framework
- **Headless UI** and **Material UI**: UI Component Libraries

---

### Back-End: ```./server```
- **Flask**: Python Microframework for Web — *INSTALL VIA **PIP***
- **Docker**: OS-level Virtualization — *INSTALL ON THEIR **WEBSITE** THROUGH GUI INSTALLER* *(FOR **HEROKU** DEPLOYMENT ONLY)*
- **NumPy** and **SciPy**: Core Libraries for Scientific Computing — *INSTALL VIA **PIP***
- **ASE**: Atomic Simulation Environment — *INSTALL VIA **PIP***
- **Libxc**: The Electronic Structure Library for DFT (Density Functional Theory) — *INSTALL VIA **BREW**, **APT**, OR **CHOCOLATEY***
- **BLAS**: Basic Linear Algebra Subprograms — *INSTALL VIA **BREW**, **APT**, OR **CHOCOLATEY***
- **GPAW**: Projector-Augmented Wave Extension for ASE (Pseudo Wave Function Generator) — *INSTALL VIA **PIP***
- **WebRTC**: Real-time Communication — *INSTALL VIA **PIP***

---

## How to Run Locally

1. Install **C-based dependencies** BLAS and Libxc globally, e.g. using ```brew``` on macOS or other package managers like ```APT``` on Linux or ```Chocolatey``` on Windows (Heroku runs on top of Ubuntu by default, so in this case, I set up a ```Dockerfile``` to ```apt-get install```. A bit of trial and error were involved in the process of finding the right method, as Heroku's official ```APT buildpack``` was not suitable for deploying applications that involve scientific computing (modules such as SciPy or GPAW)
2. Setup the **client-side**: ```cd client && npm install```
3. ```yarn build``` to convert React ```*.JSX``` into production files that Flask (our back-end) can read
4. Setup the **server-side**: On a **seperate** terminal, go to the ```root``` folder, and set up a virtual environment
5. **OPTIONAL**: ```gpaw install-data <dir>``` if you would like to generate your own version of GPAW datasets; otherwise, use the one that is pre-packaged in this repo
6. Run ```export GPAW_SETUP_PATH=~/gpaw-setups-<version>``` to direct the API to the GPAW datasets that are rendered in **step 5** (or use the one that is already included in this repo)
7. Just as a side note, **Step 6** when deploying on Heroku can be replaced by setting an environment variable in the ```CONFIG_VAR``` menu on the dashboard (Just set it to ```GPAW_SETUP_PATH=server/datasets/gpaw-setups-0.9.20000``` if you don't know what you're doing)
8. Execute ```pip3 install requirements.txt && cd client && yarn start-api``` to download all the **PyPi dependencies** as well as running the Flask server (Optionally, you can go to the ```root``` folder and execute ```flask run``` instead)
