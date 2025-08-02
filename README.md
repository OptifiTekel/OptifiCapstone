
# OPTIFI Web

A DATA INTELLIGENT FINANCIAL TRACKING THROUGH OCR AND AI-DRIVEN BUDGET FORECASTING

## Project Structure

```
OptifiCapstone/optifi-frontend/
├── app/
│   ├── calendar/
│   ├── dashboard/
│   └── forgot-password/
│   ├── home/
│   ├── login/
│   └── profile/
│   ├── register/
│   ├── scan/
│   └── settings/
└── components/
```





## CREATING A PERSONAL BRANCH
To work on features without affecting the main branch, follow these steps to create and push your own branch:

✅ Step 1: Clone the Repository (if you haven't)
  ```bash
  git clone https://github.com/OptifiTekel/OptifiCapstone.git
  cd OptifiCapstone
  ```
  
✅ Step 2: Pull the Latest Changes from main
  ```bash
  git checkout main
  git pull origin main
  ```

✅ Step 3: Create Your Personal Branch
  ```bash
  git checkout -b your-branch-name
  ```
  📌 Example:
    ```bash
              git checkout -b jeanson-dashboard-update
    ```
              
✅ Step 4: Make Your Changes
Edit files, add new features, or fix bugs.

✅ Step 5: Stage and Commit Your Changes
  ```bash
  git add .
  git commit -m "Add: your description here"
  ```
  📌 Example:
    ```bash
              git commit -m "Add: created dashboard layout"
    ```
              
✅ Step 6: Push Your Branch to GitHub
  ```bash
  git push -u origin your-branch-name
```
  📌 Example:
    ```bash
            git push -u origin jeanson-dashboard-update
    ```

## REVERT BACK FROM LAST COMMIT FROM GITHUB
  ```bash
    git status
    git reset --hard HEAD
    git clean -fd
  ```

## GET THE LATEST COMMIT FROM GITHUB
  ```bash
    git fetch origin
    git checkout master
    git pull origin master or git merge origin master
  ```

## TEMPORARILY SET ASIDE YOUR CURRENT CHANGES BEFORE PULLING NEW ONCE
  ```bash
    git fetch origin          # Get the latest updates from the remote repository
    git stash                 # Temporarily save your uncommitted changes
    git checkout master       # Switch to the master branch (or main, if that's your default)
    git pull origin master    # Pull the latest changes from the remote master branch
    git stash pop             # Reapply your stashed changes on top of the updated code
  ```

## CHECK FIRST IF GIT DETECTS YOUR CHANGES AND IF YOU'RE READY TO PUSH THE UPDATE
Example
  ```bash
    git checkout BranchName
    git add "app/(tabs)/police-officer/CrimeMap.tsx""app/(tabs)/police-officer/PoliceOfficerHome.tsx" ------ (file na ippush nyo na nilagyan nyo ng changes)
    git commit -m "Mapbox added"  ------ (add comment anong changes ginawa)
    git push -u origin BranchName
  ```

## SAVE THE CODE IN YOUR PERSONAL BRANCH
Example
  ```bash
    git status (check if you are on your own branch)
    git add .
    git commit -m "YOUR COMMENT"
    git push origin NAME_OF_YOUR_BRANCH
  ```





## License

## Contact

Jeanson Villanueva - [jeansonhelario24@gmail.com]

Project Link: [https://github.com/OptifiTekel/OptifiCapstone]
