#!/usr/bin/env perl

#TODO:

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
use Data::Dump::Color;

my $usage = "\nUSAGE: ".basename($0)." -i <indir> -o <outdir>\n";
$usage .= "\n <indir>  : A directory of HTML files 
 <outdir> : The base directory to write the results.";

my %opts;
GetOptions(\%opts, 'indir|i=s', 'outdir|o=s');
say STDERR $usage and exit(1) unless %opts;

$opts{indir}  = abs_path($opts{indir});
$opts{outdir} = abs_path($opts{outdir});

my $wd    = getcwd();
my $base  = basename($opts{indir});
my $dname = dirname($opts{indir});

# prepare assets
my $assetdir = File::Spec->catdir($opts{outdir}, 'assets'); 
make_path($assetdir, {verbose => 0, mode => 0771,});

my (@files, @subdirs);
find(sub { push @files, $File::Find::name }, $opts{indir});
die "\nERROR: No HTML files found in $opts{indir}. Exiting.\n"
    unless @files;
#dd \@files and exit;

for my $in (@files) {
    next if $in eq $opts{indir};
    next if $in =~ /nav-|header|footer/;

    if (-f $in && $in =~ /\.html$/) {
	_copy_page($in, $opts{outdir}, $dname);
    }
    elsif (-d $in) {
	#say STDERR "DEBUG subdir: $in";
	my $name = basename($in);

	my $outdir = File::Spec->catdir($opts{outdir}, $name);
	make_path($outdir, {verbose => 0, mode => 0771,});
	#say STDERR "path: $outdir";

	my @subfiles;
        find(sub { push @subfiles, $File::Find::name if -f and /\.html$/ }, $in);

	for my $f (@subfiles) {
	    next if $f =~ /nav-|header|footer/;
	    _copy_page($f, $outdir, $dname);
	}
    }
}

## Asset PATHs
for my $dir (qw(css js images fonts)) {
    my $asset = File::Spec->catdir($dname, $dir);
    my $assetdir = File::Spec->catdir($opts{outdir}, 'assets'); #, $dir);
    #make_path($assetdir, {verbose => 0, mode => 0771,});

    #say STDERR join q{ }, "DEBUG assets", $asset, $assetdir;

    my $cmd = "cp -R $asset $assetdir/";
    #say STDERR "CMD: $cmd";
    system($cmd) == 0 or die $!;
}

#my $link = "ln -s $opts{outdir}/assets $opts{outdir}/stress/assets";
#say STDERR $link;
system("ln -s $opts{outdir}/assets $opts{outdir}/stress/assets") == 0 or die $!;
#my $cp = "cp -R $wd/public/scripts $opts{outdir}/assets/";
#say STDERR $cp;
system("cp -R $wd/public/scripts $opts{outdir}/assets/") == 0 or die $!;

sub _copy_page {
    my ($file, $dest, $dname) = @_;

    my ($name, $path, $suffix) = fileparse($file, qr/\.[^.]*/);

    if ($name eq 'index') {
	my $index = File::Spec->catfile($dest, $name.$suffix);
	#say STDERR "index: $file $index";

	unless (-e $index) {
	    say STDERR "$index DOES NOT EXIST";
	    copy($file, $index) or die "Copy failed: $!"
	}

	return;
    }

    my $outdir = File::Spec->catdir($dest, $name);
    unless (-e $outdir) {
	make_path($outdir, {verbose => 0, mode => 0771,});
    }

    my $outfile = File::Spec->catfile($outdir, 'index.html');
    copy($file, $outfile) or die "Copy failed: $!";
    unlink $file;

    system("ln -s $dest/assets $outdir/assets") == 0 or die $!;

    return;
}
