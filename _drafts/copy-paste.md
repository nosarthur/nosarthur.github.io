
Copy/Paste is the most important skills for programmers.
In this post, I will share my tricks.
I will use Mac environment as example, but many tricks works with
other platforms with minor changes.

## fundamentals

- apple+c: copy
- apple+v: paste
- apple+shift+g: when a Mac GUI asks for input file
  this keyboard shortcut brings up a input window to paste file path
- mouse selection in iTerm2 automatically copies the selection

## intermediate

- apple+shift+c: mouseless copy in iTerm2
- apple+alt+c: bring up paste history via Alfred
- vim copy to clipboard

## advanced

- `alias pp='pwd | tr -d "\n" | pbcopy'`
- `alias rr='_rp(){ greadlink -f "$1"| tr -d "\n" | pbcopy;}; _rp'`
- `alias tt='tee >(tail -n 1 | grep -o "/[^ ]*" | tr -d "\n" | pbcopy)'`
