#!/usr/bin/env perl

## This will turn symbolic links for assets from absolute PATHs to relative. Necessary
## if you are going to be moving the entire static directory to another location on 
## the file system.

use 5.014;
use strict;
use warnings;
use File::Find;
use File::Spec;
use File::Copy;
use File::Basename;
use File::Path qw(make_path);
use Cwd        qw(abs_path getcwd);
use Getopt::Long;
#use Data::Dump::Color;

my $usage = "\nUSAGE: ".basename($0)." -i <indir>";

my %opts;
GetOptions(\%opts, 'indir|i=s', 'outdir|o=s');
say STDERR $usage and exit(1) unless %opts;

$opts{indir}  = abs_path($opts{indir});

my $wd    = getcwd();
my $base  = basename($opts{indir});
my $dname = dirname($opts{indir});

my (@files, @subdirs);
find(sub { push @files, $File::Find::name if -d and ! /assets|stress/ }, $opts{indir});
die "\nERROR: No HTML files found in $opts{indir}. Exiting.\n"
    unless @files;
#dd \@files and exit;

for my $in (@files) {
    next if $in eq $opts{indir};
    next if $in =~ /assets|stress|^jbrowse/;
    say $in; # for debugging

    chdir $in or die $!;
    unlink('assets') if -e 'assets';
    system("ln -s ../assets assets") == 0 or die $!;
}

exit;
