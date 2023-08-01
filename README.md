# GitHub Contrib Wall

Testing if GitHub contribution wall can be changed by editing git history. Spoiler alert: Yes... yes it can.

This repo uses scheduled GitHub actions to achieve persistance of the wall through time.

## Structure

Because GitHub uses default branch (in this case main) as the branch that will actually be visible on the contribution wall the code of this app will be saved in feat/code and every day the new commit will be force pushed to main based from feat/code.
