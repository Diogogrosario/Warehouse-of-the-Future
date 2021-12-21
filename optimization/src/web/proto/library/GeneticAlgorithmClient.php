<?php
// GENERATED CODE -- DO NOT EDIT!

namespace ;

/**
 * The Genetic Algorithm service.
 */
class GeneticAlgorithmClient extends \Grpc\BaseStub {

    /**
     * @param string $hostname hostname
     * @param array $opts channel options
     * @param \Grpc\Channel $channel (optional) re-use channel object
     */
    public function __construct($hostname, $opts, $channel = null) {
        parent::__construct($hostname, $opts, $channel);
    }

    /**
     * Generates Layout
     * @param \LayoutRequest $argument input argument
     * @param array $metadata metadata
     * @param array $options call options
     * @return \Grpc\UnaryCall
     */
    public function GenerateLayout(\LayoutRequest $argument,
      $metadata = [], $options = []) {
        return $this->_simpleRequest('/GeneticAlgorithm/GenerateLayout',
        $argument,
        ['\LayoutReply', 'decode'],
        $metadata, $options);
    }

}
