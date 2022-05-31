# scp -o StrictHostKeyChecking=no -r build/* ${userName}@${ipAddress}:${prodPath} << EOF
scp -o StrictHostKeyChecking=no -r build/* ${username}@${ip}:${path} << EOF
echo '----------------------------------Done!----------------------------------'
EOF



# with ssh password add 
# sshpass -p ${password} before scp