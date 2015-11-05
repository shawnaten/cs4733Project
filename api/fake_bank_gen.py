# coding: utf-8

import random
import sys

# this is a really intersting exercise tbh

# names that generally connote male to me
male = ["Daniel", "Edward", "Michael", "Liam", "Thomas", "Shane", "Kevin",
    "Sebastian", "José", "Levi"]

# names that generally connote female to me
female = ["Jasmine", "Olivia", "Emma", "Isabella", "Mia", "Aria", "Emily",
    "Abigail", "Marie", "Kelsie"]

# names I've known both females and males with or names that are genderless
neutral = ["Alexis", "Taylor", "Aldus", "Cory", "London", "Garnet", "Kassidy",
    "Francis", "Addison", "Sandy"]

first_name_genders = [male, female, neutral]

# make sure I didn't write any duplicates
first_name_check = []
for gender in first_name_genders:
    for first_name in gender:
        if first_name in first_name_check:
            print "There's a duplicate first name."
            sys.exit()
        else:
            first_name_check.append(first_name)

# Spanish, Netflix, San Antonio street names
last_names = ["Gonzalez", "Guadalupe", "Hernandez", "Lee", "Shelby", "Wurzbach",
    "Butt", "De Zavala", "Perrin", "Beitel"]

# compute all possible names
full_names = []
max_len = 0
for gender in first_name_genders:
    for first_name in gender:
        for last_name in last_names:
            full_name = "%s %s" % (first_name, last_name)
            full_names.append(full_name)
            if len(full_name) > max_len:
                max_len = len(full_name)

# shuffle for realism
random.shuffle(full_names)

# generate fake SSNs
ssn_strings = []
ssn_retries = 0;
for full_name in full_names:
    ssn_chosen = False
    while (ssn_chosen == False):
        ssn_1 = random.randint(100, 999)
        ssn_2 = random.randint(10, 99)
        ssn_3 = random.randint(1000, 9999)

        ssn_string = "%d-%d-%d" % (ssn_1, ssn_2, ssn_3)
        if (ssn_string not in ssn_strings):
            ssn_chosen = True
            ssn_strings.append(ssn_string)
        else:
            ssn_retries += 1

# print the info
count = 0
print ("***\n\
Bank-Id's and SSN's should be sent as integers. Don't send strings with\n\
padding or dashes.\n\
***")

print "\n%s\t%-8s\t%s" % ("Name".ljust(max_len), "Bank-Id", "SSN")
print "\nTeam %d" % ((count+1) / 10)
for full_name in full_names:
    print "%s\t%08d\t%s" % (full_name.ljust(max_len), count, ssn_strings[count])
    count += 1
    if (count == 60):
        break
    if count % 10 == 0:
        print "\nTeam %d" % (count / 10)

#print "\nSSN Retries: %d" % (ssn_retries)
