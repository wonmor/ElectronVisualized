<img width="200" alt="icon-2" src="./docs/Icon1024.png">

# ElectronVisualized

ElectronVisualized provides an web-based interactive visualization in the areas of chemistry and quantum mechanics. 
The app showcases atomic orbitals through electron density — alongside with molecular orbitals — beautifully and elegantly.

[**https://electronvisual.org**](https://electronvisual.org)

| iOS, iPadOS, and visionOS |
|:-:|
| [<img src="https://github.com/wonmor/Atomizer-Swift-Challenge/blob/bb3e156b76ce46eeed402345667d51c843f73280/Docs/appstore-badge.png" height="50">](https://apps.apple.com/us/app/atomizer-ar/id6449015706) |

## How to run
```
1. Depending on OS environment, install the same OS-level dependencies written down on Dockerfile
If virtualenv is not installed
pip install virtualenv
python -m virtualenv venv
venv/bin/activate
pip install -r requirements.txt
python electron_visualized.py
cd client && npm install
npm run start
```

**Designed and Developed by John Seong.**

<table><tr>

<td valign="center"><img width="500" alt="Screenshot-1" src="docs/screenshot1.png" /></td>

<td valign="center"><img width="500" alt="Screenshot-2" src="docs/screenshot2.png" /></td>

</tr></table>

```
TIPS & TRICKS

PIP FREEZE LOCALLY: pip3 freeze -l > requirements.txt
DEPLOYING FLASK + REACT APP ON HEROKU: https://www.realpythonproject.com/how-to-setup-automated-deployment-for-multiple-apps-under-a-single-github-repository-in-heroku/
HOW TO INSTALL ASE AND GPAW ON LINUX (SERVER): http://dtu.cnwiki.dk/10302/page/2699/optional-install-ase-and-gpaw-on-your-laptop

ATOMIC ORBITAL (SPHERICAL HARMONICS) MLAB: https://dpotoyan.github.io/Chem324/H-atom-wavef.html
SHIFT+ALT+CLICK BELOW = MULTIPLE CURSORS ON VSCODE

UPDATED (NOV. 29, 2022): MAKE SURE YOU brew install jpeg BEFORE PERFORMING PIP INSTALL FROM REQUIREMENTS.TXT ACTION!
ALSO COMMENT OUT THE GPAW LINE IF YOU HAVE INSTALLED PREVIOUSLY USING BREW...

-----------------------------------------------------------------------------

VVIP: ENVIRONMENTAL VARIABLES REQUIRED
(ON THE SERVER, GO ON THE SETTINGS, OR LOCALLY, CREATE A NEW .ENV FILE IN THE ROOT FOLDER)

<< BELOW IS A VERY IMPORTANT STEP TO SUCCESSFULLY RUN ASE AND GPAW LOCALLY (MACOS) >>
1. export C_INCLUDE_PATH=/my/path/to/libxc/5.2.0/include
2. export LIBRARY_PATH=/my/path/to/libxc/5.2.0/lib
3. export LD_LIBRARY_PATH=/my/path/to/libxc/5.2.0/lib

(IN CASE OF MACOS: /opt/homebrew/Cellar/libxc/6.1.0 IS THE PATH FOR LIBXC)

4. GPAW_SETUP_PATH="server/datasets/gpaw-setups-0.9.20000"
5. SECRET_KEY — FOR FLASK
6. AWS_SECRET_ACCESS_KEY, AWS_DEFAULT_REGION="us-east-2", AWS_ACCESS_KEY_ID

How to connect to DigitalOcean VPS console terminal from your local machine:
1. ssh <username>@<IP_ADDRESS>
2. Enter password

<username> can be root, or your own username

Celery Setup Guide:
https://flask.palletsprojects.com/en/2.3.x/patterns/celery/
```


## Stunning Visuals
Both atomic and molecular orbitals are displayed on a three-dimensional plane where you can freely rotate around.

---

## Organic Playground
With our playground feature, you can draw any molecules with dots and lines.
Auto-snapping allows users to do this in an easiest way possible.

---

## Find My Electron
Our robust search feature provides an extraordinary insight into the properties of molecules.
Unapologetically — it is the most efficient way of navigating the PubChem database.

<table><tr>

<td valign="center"><img width="500" alt="Screenshot-1" src="docs/screenshot3.png" /></td>

<td valign="center"><img width="500" alt="Screenshot-2" src="docs/screenshot5.png" /></td>

</tr></table>

<table><tr>

<td valign="center"><img width="500" alt="Screenshot-1" src="https://user-images.githubusercontent.com/35755386/166985579-96c2d483-e74c-4802-ac92-762b2ccc8bc9.jpg" /></td>

<td valign="center"><img width="500" alt="Screenshot-2" src="https://user-images.githubusercontent.com/35755386/172083147-e11ab873-f156-4dda-8d26-71652a1de0c8.png" /></td>

</tr></table>
