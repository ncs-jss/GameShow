import subprocess

# process = subprocess.Popen(
# "git config credential.helper store", stdout=subprocess.PIPE, shell=True)

cmds = [
    "git add .",
    "git commit -m ",
    "git push origin master"
]
print("Enter a commit message")
commitMessage = "'" + raw_input().strip() + "'"
cmds[1] += "_".join(commitMessage.split())
for cmd in cmds:
    query = cmd.split()
    process = subprocess.Popen(query, stdout=subprocess.PIPE)
    print(process.communicate()[0])

print('All done!')
