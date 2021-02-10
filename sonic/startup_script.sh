#!/bin/bash

sudo docker run -p 1491:1491 -v /home/sonic/sonic.cfg:/etc/sonic.cfg -v /home/sonic/store/:/var/lib/sonic/store/ -d valeriansaliou/sonic:v1.3.0