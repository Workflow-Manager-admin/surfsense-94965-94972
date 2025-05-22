#!/bin/bash
cd /home/kavia/workspace/code-generation/surfsense-94965-94972/main_container_for_surfsense
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

