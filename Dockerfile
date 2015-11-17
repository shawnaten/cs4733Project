# Should use 'FROM node:4-onbuild' but 'Error: Module version mismatch.
# Expected 46, got 47.'
FROM node:onbuild
EXPOSE 80
